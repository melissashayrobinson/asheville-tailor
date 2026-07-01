type IconProps = {
  className?: string;
};




export function GarmentIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-14 w-14 ${className}`}
      fill="none"
      aria-hidden="true">
      <path d="M24 10h16l5 8 9 5-6 10-6-3v24H22V30l-6 3-6-10 9-5 5-8Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 10c1.5 5 4.2 7.5 8 7.5S38.5 15 40 10" stroke="currentColor" strokeWidth="2" />
      <path d="M25 38h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GuidanceIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-14 w-14 ${className}`}
      fill="none"
      aria-hidden="true">
      <path d="M18 14h28v36H18V14Z" stroke="currentColor" strokeWidth="2" />
      <path d="M24 24h16M24 32h16M24 40h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 42l8 8M52 50l4-12-12 4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={`h-14 w-14 ${className}`}
      fill="none"
      aria-hidden="true">
      <path d="M16 18h32v32H16V18Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16 26h32M24 12v10M40 12v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 35h4M36 35h4M24 43h4M36 43h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}