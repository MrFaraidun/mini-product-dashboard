import React from "react";

interface ResponsiveTableContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveTableContainer({
  children,
  className = "",
}: ResponsiveTableContainerProps) {
  return (
    <div className={`overflow-hidden border rounded-md ${className}`}>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">{children}</div>
      </div>
    </div>
  );
}
