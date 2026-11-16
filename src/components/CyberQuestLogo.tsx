interface CyberQuestLogoProps {
  compact?: boolean;
}

export function CyberQuestLogo({ compact = false }: CyberQuestLogoProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
        <svg
          width="30"
          height="30"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M18 3L31 8.5V17.5C31 25.1 25.4 31.4 18 33.5C10.6 31.4 5 25.1 5 17.5V8.5L18 3Z"
            fill="url(#cqShieldGrad)"
            stroke="#22D3EE"
            strokeWidth="1.6"
          />
          <path
            d="M13 18.2L16.3 21.5L23.5 14.3"
            stroke="#ECFEFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cqShieldGrad" x1="5" y1="3" x2="31" y2="33.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0891B2" stopOpacity="0.45" />
              <stop offset="1" stopColor="#6D28D9" stopOpacity="0.55" />
            </linearGradient>
          </defs>
        </svg>
        <span className="font-display text-lg font-bold tracking-tight text-white">
          CYBER <span className="text-cyan-400">QUEST</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]"
      >
        <path
          d="M32 5L55 14.5V31C55 44.5 45.2 55.8 32 59.5C18.8 55.8 9 44.5 9 31V14.5L32 5Z"
          fill="url(#cqHeroFill)"
          stroke="url(#cqHeroStroke)"
          strokeWidth="2.2"
        />
        <path
          d="M32 13L47 19.5V30.5C47 39.8 40.5 47.6 32 50.4C23.5 47.6 17 39.8 17 30.5V19.5L32 13Z"
          stroke="rgba(34,211,238,0.38)"
          strokeWidth="1.2"
        />
        <path
          d="M24 31.8L29.5 37.3L41 25.8"
          stroke="#67E8F9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="cqHeroFill" x1="9" y1="5" x2="55" y2="59.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0E2A47" />
            <stop offset="1" stopColor="#1B1442" />
          </linearGradient>
          <linearGradient id="cqHeroStroke" x1="9" y1="5" x2="55" y2="59.5" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" />
            <stop offset="0.55" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
      <div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
          CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400">QUEST</span>
        </h1>
        <p className="mt-1.5 font-mono text-xs sm:text-sm tracking-[0.22em] text-cyan-300/90 uppercase">
          Web Security Mission
        </p>
      </div>
    </div>
  );
}
