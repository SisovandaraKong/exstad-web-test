import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface RoadmapCardProps {
  icon: string;
  title: string;
  label?: string;
  className?: string;
}

export default function RoadmapCard({
  icon,
  title,
  label,
  className,
}: RoadmapCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Map label to HEX color
  const badgeColor = React.useMemo(() => {
    switch (label?.toUpperCase()) {
      case "BASIC":
        return "#10B981"; // emerald green
      case "INTERMEDIATE":
        return "#F59E0B"; // amber
      case "ADVANCED":
        return "#EF4444"; // red
      default:
        return "#6B7280"; // gray fallback
    }
  }, [label]);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10",
        "dark:border-border/20 dark:bg-card/30",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      {/* Card content */}
      <div className="relative flex items-center gap-4 p-6">
        {/* Icon */}
        <div className="relative shrink-0">
          <div className="flex size-14 items-center justify-center rounded-lg shadow-lg shadow-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary/30">
            <Image
              src={icon}
              alt={`${title} icon`}
              width={32}
              height={32}
              className="size-8 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
              unoptimized
            />
          </div>
          <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Text + Badge */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="font-sans text-base font-semibold leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          {label && (
            <Badge
              style={{ backgroundColor: badgeColor, color: "#fff" }}
              className="w-fit rounded-full border-0 px-2.5 py-0.5 text-[11px] font-medium tracking-wide transition-all duration-300"
            >
              {label}
            </Badge>
          )}
        </div>

        {/* Chevron */}
        <div
          className={cn(
            "shrink-0 transition-all duration-500",
            isHovered ? "translate-x-1 opacity-100" : "translate-x-0 opacity-40"
          )}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-muted-foreground transition-colors duration-300 group-hover:text-primary"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-all duration-500",
          isHovered ? "w-full opacity-100" : "w-0 opacity-0"
        )}
      />
    </div>
  );
}
