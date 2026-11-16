interface Props {
  className?: string;
}

export default function ConcordeMark({ className }: Props) {
  return (
    <svg viewBox="0 0 400 120" className={className} aria-hidden="true">
      {/* Fuselage */}
      <path
        d="M 18 61
           C 55 51, 150 46, 250 46
           L 336 46
           C 362 46, 376 52, 380 59
           C 376 66, 362 70, 336 70
           L 250 70
           C 150 71, 55 68, 18 63
           Z"
        fill="none"
        stroke="var(--glow)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Droop nose */}
      <path d="M 18 61 L 46 51" stroke="var(--glow)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Delta wing */}
      <path
        d="M 150 68 L 244 108 L 312 69 Z"
        fill="none"
        stroke="var(--glow)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Tail fin */}
      <path
        d="M 340 47 L 360 17 L 371 47 Z"
        fill="none"
        stroke="var(--glow)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* Mach shock lines */}
      <g stroke="var(--glow-dim)" strokeWidth="1" strokeDasharray="2 6">
        <path d="M 0 58 L 14 58" />
        <path d="M 4 66 L 16 66" />
      </g>
    </svg>
  );
}
