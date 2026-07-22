import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "solid";
}

export default function Button({ variant = "solid", className = "", ...rest }: ButtonProps) {
  const variantClass = variant === "outline" ? "btn btn--outline" : "btn btn--solid";
  return <button className={`${variantClass} ${className}`.trim()} {...rest} />;
}
