import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "quiet";

const VARIANT: Record<Variant, string> = {
  primary: "bg-coral text-ink shadow-card hover:bg-[#ff7d6b] active:scale-[0.98]",
  quiet: "border border-hairline bg-white text-ink hover:bg-hover",
};

export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={`inline-flex h-10 cursor-pointer items-center justify-center rounded-xl px-4 text-[14px] font-semibold transition duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${VARIANT[variant]} ${className}`}
      {...props}
    />
  );
}
