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
    "bg-brand-green text-brand-black hover:bg-brand-black hover:text-brand-green focus:ring-brand-green",
  outline:
    "border border-brand-green text-brand-green hover:bg-brand-green hover:text-brand-black focus:ring-brand-green",
  ghost:
    "text-brand-green hover:text-brand-black hover:bg-brand-green/10 focus:ring-brand-green",
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