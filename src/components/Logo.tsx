import { cn } from "@/lib/utils";
import BroccoliIcon from "@/public/BroccoliIcon.svg";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, size = "md" }: LogoProps) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center">
        <img src="/BroccoliIcon.svg" alt="Logo" className="w-8 h-8" />
      </div>

      <span className={cn("font-display font-bold text-foreground text-2xl")}>Fit</span>
    </div>
  );
};
