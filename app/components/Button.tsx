import Link from "next/link";


type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  href,
  children,
  disabled = false,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {

  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-4 transition duration-300 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "border border-transparent bg-lime text-ink hover:border-ink",

    secondary:
      "border border-ink bg-transparent text-ink hover:bg-lime",

    tertiary:
      "border border-transparent bg-transparent text-ink hover:border-ink",

    disabled:
      "bg-grey text-parchment",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}