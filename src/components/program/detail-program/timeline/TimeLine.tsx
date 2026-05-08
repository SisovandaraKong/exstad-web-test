"use client";

import React from "react";
import ReactFlow, { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { useGetOpeningProgramTimelinesQuery } from "./timeLineApi";
import type { TimelineType } from "@/types/opening-program";

type Props = {
  openingProgramUuid: string;
};

type EventItem = {
  id: number;
  // used for logic (sorting/current/completed): prefer endDate if present, else startDate
  date: string;
  // shown in UI: "Month D, YYYY - Month D, YYYY" if end exists, otherwise just "Month D, YYYY"
  displayDate: string;
  title: string;
};

type NodeData = {
  event: EventItem;
  stepNumber: number;
  isCompleted: boolean;
  isCurrent: boolean;
};

type CustomNodeProps = {
  data: NodeData;
};

function useWindowWidth(): number {
  const [w, setW] = React.useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  React.useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return w;
}

const CustomNode = ({ data }: CustomNodeProps) => {
  const { event, isCompleted, isCurrent, stepNumber } = data;
  const isOddNotOne =
    typeof stepNumber === "number" && stepNumber % 2 === 1 && stepNumber !== 1;
  const isOdd = typeof stepNumber === "number" && stepNumber % 2 === 1;

  const width = useWindowWidth();
  const isMobile = width < 640;

  let colorClass = "bg-yellow-600";
  let extraClasses = "";
  if (isCompleted) {
    colorClass = "bg-green-600";
  } else if (isCurrent) {
    colorClass = "bg-red-600";
    extraClasses = " animate-pulse";
  }

  let textColor = "text-foreground-3";
  if (isCompleted || isCurrent) {
    textColor = "text-foreground";
  }

  const containerPos = isMobile
    ? ` ${
        isOdd ? "-top-4 left-20" : "-top-6 -left-50"
      } min-w-[200px] max-w-[260px]`
    : `-left-2 ${
        isOddNotOne ? "top-20" : "-top-30"
      } min-w-[280px] max-w-[400px]`;

  return (
    <div className="relative">
      {/* Main node circle */}
      <div
        className={`rounded-full w-10 h-10 flex gap-4 items-center justify-center text-white font-bold text-2xl shadow-xl ${colorClass}${extraClasses}`}
      >
        <div className="rounded-full w-3 h-3 flex gap-4 items-center justify-center text-white font-bold text-2xl shadow-xl bg-background"></div>
        <Handle type="source" position={Position.Right} className="opacity-0" />
        <Handle type="target" position={Position.Left} className="opacity-0" />
      </div>

      {/* Label with event details */}
      <div className={`absolute flex gap-2 ${containerPos} ${textColor}`}>
        <div>
          <h1 className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-5xl font-black font-bilingual">
            {stepNumber}
          </h1>
        </div>
        <div className="p-2">
          <div className="flex items-center gap-2 font-bilingual">
            <span
              className={`xl:font-h5 lg:font-h5 md:font-h6 sm:font-h6 font-h6 font-bold font-bilingual py-1 rounded-full ${
                isOddNotOne && !isMobile ? "relative top-0" : ""
              }`}
            >
              {event.displayDate}
            </span>
          </div>
          <h4 className="font-bold mb-2 xl:font-h4 lg:font-h4 md:font-h5 sm:font-h5 font-h5 font-bilingual">
            {event.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

const nodeTypes = { timeline: CustomNode };

const generateNodesAndEdges = (
  timelineData: EventItem[],
  isMobile: boolean
) => {
  // compute today's date in YYYY-MM-DD (local)
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const normalizeYMD = (s?: string) => {
    if (!s) return s;
    const parts = s.split("-");
    if (parts.length === 3 && /^\d{4}$/.test(parts[0])) {
      const y = parts[0];
      const m = parts[1].padStart(2, "0");
      const d = parts[2].padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
    const dt = new Date(s);
    if (isNaN(dt.getTime())) return s;
    const yy = dt.getFullYear();
    const mm2 = String(dt.getMonth() + 1).padStart(2, "0");
    const dd2 = String(dt.getDate()).padStart(2, "0");
    return `${yy}-${mm2}-${dd2}`;
  };

  const allDates = timelineData
    .map((e) => normalizeYMD(e.date))
    .filter(Boolean)
    .sort();
  const futureDates = allDates.filter((d) => !!d && d >= todayStr) as string[];
  const nextDate = futureDates.length > 0 ? futureDates[0] : null;

  const nodes = timelineData.map((event, index) => {
    const eventDateStr = normalizeYMD(event.date) || "";
    const isCurrent =
      eventDateStr === todayStr ||
      (nextDate !== null && eventDateStr === nextDate);
    const isCompleted = eventDateStr !== "" && eventDateStr < todayStr;

    return {
      id: `${index + 1}`,
      type: "timeline",
      position: {
        // mobile: -100 / 0, desktop: -700 / -200
        x: isMobile
          ? index % 2 === 0
            ? -100
            : 0
          : index % 2 === 0
          ? -700
          : -200,
        y: isMobile ? index * 150 + 50 : index * 200 + 100,
      },
      data: {
        event,
        stepNumber: index + 1,
        isCompleted,
        isCurrent,
      },
    };
  });

  const edges = timelineData.slice(0, -1).map((_, index) => ({
    id: `e${index + 1}-${index + 2}`,
    source: `${index + 1}`,
    target: `${index + 2}`,
    type: "bezier",
    style: { stroke: "#253c95", strokeWidth: 8 },
    animated: false,
  }));

  return { nodes, edges };
};

function toYmd(v: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Month Day, Year label (e.g., "July 7, 2025")
function toMonthDayYearLabel(ymd: string): string {
  const m = ymd.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) {
    const d = new Date(ymd);
    if (isNaN(d.getTime())) return ymd;
    return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }
  const year = m[1];
  const monthIdx = Math.max(0, Math.min(11, Number(m[2]) - 1));
  const day = String(Number(m[3]));
  return `${MONTHS[monthIdx]} ${day}, ${year}`;
}

const TimeLine: React.FC<Props> = ({ openingProgramUuid }) => {
  const width = useWindowWidth();
  const isMobile = width < 640;

  const { data, isLoading, isError } = useGetOpeningProgramTimelinesQuery(
    {
      uuid: openingProgramUuid,
    },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,

    }
  );

  const events: EventItem[] = React.useMemo(() => {
    const src = Array.isArray(data) ? data : ([] as TimelineType[]);
    const mapped = src.map((t, idx) => {
      const startYmd = toYmd(t.startDate);
      const hasEnd = Boolean(t.endDate && t.endDate.trim());
      const endYmd = hasEnd ? toYmd(t.endDate) : "";
      const startLabel = toMonthDayYearLabel(startYmd);
      const endLabel = hasEnd ? toMonthDayYearLabel(endYmd) : "";
      return {
        id: idx + 1,
        // logic date: prefer end if present, else start
        date: hasEnd ? endYmd : startYmd,
        title: t.title,
        // display month names with year
        displayDate: hasEnd ? `${startLabel} - ${endLabel}` : startLabel,
      };
    });
    mapped.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    return mapped;
  }, [data]);

  const { nodes, edges } = React.useMemo(
    () => generateNodesAndEdges(events, isMobile),
    [events, isMobile]
  );

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">Loading…</div>
    );
  }
  if (isError) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-red-500">
        Failed to load timeline.
      </div>
    );
  }

  console.log(data)

  return (
    <div className="h-full bg-background">
      <div className="h-[185vh] m-0 p-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          defaultViewport={{
            x: isMobile ? -10 : -5,
            y: 0,
            zoom: isMobile ? 0.9 : 1,
          }}
          fitViewOptions={{
            padding: 0.1,
            includeHiddenNodes: false,
            minZoom: 0.5,
            maxZoom: 0.8,
          }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={true}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
        />
      </div>
    </div>
  );
};

export default TimeLine;
