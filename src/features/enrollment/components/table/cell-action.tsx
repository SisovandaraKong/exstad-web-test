import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Enrollment } from "@/types/enrollment";
import Bakong from "@/components/bakong/Bakong";

import { BadgeDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnrollmentCellAction({
  enrollment,
  amount,
  openingProgramUuid,
}: {
  enrollment: Enrollment;
  amount: number;
  openingProgramUuid: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Tooltip disableHoverableContent={enrollment.isPaid}>
      <TooltipTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className={`transition-colors duration-300 ease-in-out cursor-pointer ${
            enrollment.isPaid ? "" : "text-[#B25E00] bg-[#FFF4E5]"
          }`}
          variant={"ghost"}
          disabled={enrollment.isPaid}
        >
          <BadgeDollarSign />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {enrollment.isPaid
            ? "Payment already processed"
            : "Click to process payment"}
        </p>
      </TooltipContent>

      {/* Mount Bakong modal and close it when onClose is called */}
      <Bakong
        open={isOpen}
        amount={amount}
        openingProgramUuid={openingProgramUuid}
        enrollmentUuid={enrollment.uuid}
        onClose={() => setIsOpen(false)}
      />
    </Tooltip>
  );
}