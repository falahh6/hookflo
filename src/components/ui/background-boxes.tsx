import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBoxes = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
      <div
        className={cn(
          "absolute inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
