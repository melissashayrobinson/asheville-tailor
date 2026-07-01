import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-4 transition duration-300";

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
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
}