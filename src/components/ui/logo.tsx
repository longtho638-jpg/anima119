import React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "color";
}

export function Logo({ className, variant = "color", ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {/* Golden Triskele / Trinity Knot Symbol */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          variant === "dark" ? "text-[#0A1628]" : "text-[#C5A55A]"
        )}
      >
        <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M18 6C18 6 12 10 12 18C12 22 14 25 18 28"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M18 6C18 6 24 10 24 18C24 22 22 25 18 28"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M8 22C8 22 12 18 18 18C24 18 28 22 28 22"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.6" />
      </svg>
      <div className="flex flex-col">
        <Typography
          variant="headline-small"
          className={cn(
            "font-bold leading-none tracking-wider",
            variant === "dark" ? "text-[#0A1628]" : "text-[#C5A55A]"
          )}
        >
          ANIMA 119
        </Typography>
      </div>
    </div>
  );
}
