// NoDataComponent.tsx
import React from "react";

type NoDataComponentProps = {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
    className?: string;
};

const NoDataComponent: React.FC<NoDataComponentProps> = ({
  title = "No Content Available",
  message = "This program does not have any overview content yet.",
  icon,
  className,
}) => {
    const defaultClasses = "text-center bg-background rounded-b-[24px] py-12 min-h-screen h-fit flex justify-center items-center "
  return (
    <div className= {`${defaultClasses} ${className}`}>
      <div className="inline-flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {icon || (
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NoDataComponent;