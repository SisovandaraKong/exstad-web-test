"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useGetScholarByUsernameQuery } from "@/components/student/StudentApi";

type Props = {
  username: string;
  topAnchor: React.RefObject<HTMLDivElement>;
  bottomAnchor: React.RefObject<HTMLDivElement>;
  topSize?: number;
  bottomSize?: number;
  blurDataURL?: string;
  viewportOffsetTop?: number;

  /** How much to lift on mobile (in px); positive number = moves up */
  mobileLiftPx?: number;
};

function pageX(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.left + window.scrollX;
}
function pageY(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return r.top + window.scrollY;
}

const nextFrame = () =>
  new Promise<void>((r) => requestAnimationFrame(() => r()));

export default function SharedScrollAvatar({
  username,
  topAnchor,
  bottomAnchor,
  topSize = 350,
  bottomSize = 192,
  blurDataURL,
  viewportOffsetTop = 0,
  mobileLiftPx = 80, // default mobile lift upwards
}: Props) {
  // -------- Avatar URL (cache-busted)
  const { data: scholar } = useGetScholarByUsernameQuery(username);
  const [src, setSrc] = React.useState("/avatar-fallback.png");

  React.useEffect(() => {
    if (!scholar) return;
    const raw =
      scholar?.avatar && /^https?:\/\//.test(String(scholar.avatar))
        ? (scholar.avatar as string)
        : "/avatar-fallback.png";
    const sep = raw.includes("?") ? "&" : "?";
    const v = scholar?.audit?.updatedAt
      ? new Date(scholar.audit.updatedAt).getTime()
      : Date.now();
    setSrc(`${raw}${sep}v=${v}`);
  }, [scholar?.avatar, scholar?.audit?.updatedAt]);

  // -------- Responsive sizing
  const [vw, setVw] = React.useState<number>(
    typeof window === "undefined" ? 1024 : window.innerWidth
  );
  React.useLayoutEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const isMobile = vw < 640;
  const topSizePx = isMobile ? Math.min(170, topSize) : topSize;
  const bottomSizePx = isMobile ? Math.min(120, bottomSize) : bottomSize;
  const mobileOffset = isMobile ? -Math.abs(mobileLiftPx) : 0; // move UP on mobile

  // -------- Anchors measurement values
  const startX = useMotionValue(0);
  const startY = useMotionValue(0);
  const endX = useMotionValue(0);
  const endY = useMotionValue(0);
  const [measured, setMeasured] = React.useState(false);

  // -------- Scroll progress
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);

  const updateProgress = React.useCallback(
    (yNow: number) => {
      const s = startY.get();
      const e = endY.get();
      const startAt = s - window.innerHeight * 0.6;
      const endAt = e - window.innerHeight * 0.5;
      const denom = Math.max(1, endAt - startAt);
      const p = (yNow - startAt) / denom;
      progress.set(Math.min(1, Math.max(0, p)));
    },
    [startY, endY, progress]
  );

  // -------- Wait until BOTH anchors exist, then measure & observe
  React.useLayoutEffect(() => {
    let cancelled = false;
    let rafId: number | null = null;

    const waitForAnchors = async () => {
      while (!cancelled && (!topAnchor.current || !bottomAnchor.current)) {
        await nextFrame();
      }
      if (cancelled) return;

      const t = topAnchor.current!;
      const b = bottomAnchor.current!;

      await nextFrame();
      await nextFrame();
      if (cancelled) return;

      const compute = () => {
        const tW = t.clientWidth || topSizePx;
        const tH = t.clientHeight || topSizePx;
        const bW = b.clientWidth || bottomSizePx;
        const bH = b.clientHeight || bottomSizePx;
        if (!tW || !tH || !bW || !bH) return;

        startX.set(pageX(t) + tW / 2);
        startY.set(pageY(t) + tH / 2);
        endX.set(pageX(b) + bW / 2);
        endY.set(pageY(b) + bH / 2);

        if (!measured) setMeasured(true);
        updateProgress(scrollY.get());

        document.documentElement.setAttribute(
          "data-shared-avatar-ready",
          "true"
        );
      };

      compute();

      const ro = new ResizeObserver(() => {
        rafId = requestAnimationFrame(compute);
      });
      ro.observe(t);
      ro.observe(b);

      const onResize = () => (rafId = requestAnimationFrame(compute));
      window.addEventListener("resize", onResize);

      return () => {
        ro.disconnect();
        window.removeEventListener("resize", onResize);
        if (rafId) cancelAnimationFrame(rafId);
      };
    };

    const cleanupPromise = waitForAnchors();

    return () => {
      cancelled = true;
      document.documentElement.removeAttribute("data-shared-avatar-ready");
      cleanupPromise.then((cleanup) => cleanup && cleanup());
    };
  }, [
    topAnchor,
    bottomAnchor,
    topSizePx,
    bottomSizePx,
    startX,
    startY,
    endX,
    endY,
    scrollY,
    updateProgress,
    measured,
  ]);

  // keep progress synced while scrolling
  React.useEffect(() => {
    const unsub = scrollY.on("change", (y) => updateProgress(y));
    return () => unsub();
  }, [scrollY, updateProgress]);

  // -------- Interpolations
  const cxRaw = useTransform([startX, endX, progress], (values) => {
    const [sx, ex, p] = values as number[];
    return sx + (ex - sx) * p;
  });
  const cyRaw = useTransform([startY, endY, progress], (values) => {
    const [sy, ey, p] = values as number[];
    return sy + (ey - sy) * p;
  });
  const sizeRaw = useTransform(progress, [0, 1], [topSizePx, bottomSizePx]);

  // 🔒 Lock rotation at 0 degrees
  const rotRaw = useTransform(progress, [0, 1], [0, 0]);

  const spring = { stiffness: 200, damping: 40, bounce: 0, mass: 1.2 } as const;
  const cx = useSpring(cxRaw, spring);
  const cyDoc = useSpring(cyRaw, spring);
  const size = useSpring(sizeRaw, spring);
  const rot = useSpring(rotRaw, spring);

  const xFly = useTransform([cx, size], (values) => {
    const [cxv, s] = values as number[];
    return cxv - s / 2;
  });
  const yFly = useTransform([cyDoc, scrollY, size], (values) => {
    const [cy, sy, s] = values as number[];
    return cy - sy - s / 2 - (viewportOffsetTop || 0) + mobileOffset;
  });

  // -------- Docking
  const xDock = useMotionValue(0);
  const yDock = useMotionValue(0);
  const [docked, setDocked] = React.useState(false);

  React.useEffect(() => {
    const unsub = progress.on("change", (p: number) => setDocked(p >= 0.999));
    return () => unsub();
  }, [progress]);

  React.useEffect(() => {
    const updateDock = () => {
      const b = bottomAnchor.current;
      if (!b) return;
      const r = b.getBoundingClientRect();
      xDock.set(r.left + r.width / 2 - bottomSizePx / 2);
      yDock.set(r.top + r.height / 2 - bottomSizePx / 2);
    };
    updateDock();
    const unsub = scrollY.on("change", updateDock);
    window.addEventListener("resize", updateDock);
    return () => {
      unsub();
      window.removeEventListener("resize", updateDock);
    };
  }, [bottomAnchor, bottomSizePx, scrollY, xDock, yDock]);

  const x = docked ? xDock : xFly;
  const y = docked ? yDock : yFly;

  if (!measured) return null;

  return (
    <motion.div
      initial={false}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x,
        y,
        width: size,
        height: size,
        zIndex: 40,
        rotateZ: rot, // always 0°
        pointerEvents: "none",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <Image
        src={src}
        alt={scholar?.englishName || scholar?.username || "profile photo"}
        fill
        className="rounded-full object-cover shadow-2xl object-top"
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        sizes="(min-width:1024px) 350px, (min-width:768px) 160px, (min-width:640px) 112px, 60px"
        onError={() => setSrc("/avatar-fallback.png")}
        priority
      />
    </motion.div>
  );
}