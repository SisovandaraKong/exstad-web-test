"use client";

import React from "react";
import { Package } from "lucide-react";

type NotFoundProps = {
  title?: string;
  icon?: React.ReactNode;
  className?: string; // optional to customize container styles
};

const NotFoundProgram: React.FC<NotFoundProps> = ({
  title = "No Data Found",
  icon = <Package size={64} className="text-muted-foreground opacity-30" />,
  className = "flex flex-col space-y-3 justify-center items-center min-h-screen h-fit",
}) => {
  return (
    <div className={className}>
      {icon}
      <span className="text-muted-foreground text-sm">{title}</span>
    </div>
  );
};

export default NotFoundProgram;
