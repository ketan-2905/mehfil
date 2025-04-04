
import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface AnimatedElementProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: "float" | "pulse" | "slide-up" | "slide-down" | "rotate" | "fade-in" | "none";
  delay?: number;
  className?: string;
}

const AnimatedElement = ({
  children,
  animation = "fade-in",
  delay = 0,
  className,
  ...props
}: AnimatedElementProps) => {
  const animationStyles = {
    float: "animate-float",
    pulse: "animate-pulse-light",
    "slide-up": "animate-slide-up",
    "slide-down": "animate-slide-down",
    rotate: "animate-rotate-slow",
    "fade-in": "animate-fade-in",
    none: ""
  };

  return (
    <div
      className={cn(animationStyles[animation], className)}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;
