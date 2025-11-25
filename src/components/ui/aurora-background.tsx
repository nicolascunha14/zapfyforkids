"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-screen items-center justify-center bg-background dark:bg-background text-foreground transition-bg overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,hsl(0_0%_100%)_0%,hsl(0_0%_100%)_7%,transparent_10%,transparent_12%,hsl(0_0%_100%)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,hsl(222.2_84%_4.9%)_0%,hsl(222.2_84%_4.9%)_7%,transparent_10%,transparent_12%,hsl(222.2_84%_4.9%)_16%)]
            [--aurora:repeating-linear-gradient(100deg,hsl(216_45%_68%/0.4)_10%,hsl(156_35%_72%/0.4)_15%,hsl(48_40%_78%/0.3)_20%,hsl(216_40%_70%/0.3)_25%,hsl(156_30%_75%/0.3)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert-0 dark:invert
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-70 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};