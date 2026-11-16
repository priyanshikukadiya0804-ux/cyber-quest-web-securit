export function DigitalGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050814]"
    >
      {/* Subtle radial glow accents */}
      <div
        className="absolute -top-40 left-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(6, 182, 212, 0.42) 0%, rgba(59, 130, 246, 0.16) 45%, transparent 72%)',
        }}
      />
      <div
        className="absolute -bottom-48 right-1/5 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(124, 58, 237, 0.38) 0%, rgba(37, 99, 235, 0.14) 50%, transparent 75%)',
        }}
      />
      {/* Animated digital grid */}
      <div className="cyber-grid-bg absolute inset-0 opacity-75" />
      {/* Vignette edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 42%, rgba(4, 7, 18, 0.88) 100%)',
        }}
      />
    </div>
  );
}
