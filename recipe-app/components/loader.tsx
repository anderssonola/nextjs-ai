import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent";
}

export default function Loader({
  size = "md",
  color = "primary",
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "border-4 rounded-full animate-spin",
          sizeClasses[size],
          colorClasses[color],
          "border-t-current border-r-current border-b-transparent border-l-transparent"
        )}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
