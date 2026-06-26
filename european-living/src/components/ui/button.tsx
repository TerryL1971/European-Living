// european-living/src/components/ui/button.tsx

import * as React from "react";
import { cn } from "@/lib/utils";
import { Link, LinkProps } from "react-router-dom";

type ButtonVariants = "default" | "outline" | "ghost";

// Base styles shared across all buttons - ADDED cursor-pointer
const baseStyles =
  "inline-flex items-center justify-center px-4 py-2 rounded-xl font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

const variants: Record<ButtonVariants, string> = {
  default:
    "bg-primary text-primary-foreground hover:bg-[var(--brand-primary-light)] focus:ring-ring",
  outline:
    "border border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground focus:ring-ring",
  ghost:
    "text-secondary hover:text-secondary-foreground hover:bg-secondary/10 focus:ring-ring",
};

// Two prop types: one for <button> and one for <Link>
type ButtonAsButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
  variant?: ButtonVariants;
};

type ButtonAsLink = LinkProps & {
  as: "link";
  variant?: ButtonVariants;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const { variant = "default", className, children, as = "button", ...rest } = props;

    const combinedClassName = cn(baseStyles, variants[variant], className);

    if (as === "link") {
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} className={combinedClassName} {...(rest as LinkProps)}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";