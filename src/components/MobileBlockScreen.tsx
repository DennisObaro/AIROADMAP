import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

/**
 * Lottie (optional) — works great on mobile (SVG/canvas via lottie-web).
 *
 * Option A — file in `public/` (e.g. export JSON from LottieFiles → `public/lottie/mobile-gate.json`):
 *   `MOBILE_GATE_LOTTIE_URL = '/lottie/mobile-gate.json'`
 *
 * Option B — bundled with Vite (better caching, no extra fetch):
 *   `import anim from '../assets/mobile-gate.json'`
 *   `MOBILE_GATE_LOTTIE_INLINE = anim`
 *
 * DotLottie (.lottie): use `@lottiefiles/dotlottie-react` instead, or convert to JSON on LottieFiles.
 */
const MOBILE_GATE_LOTTIE_URL: string | null = null
const MOBILE_GATE_LOTTIE_INLINE: object | null = null

/**
 * Static image (optional) — PNG/SVG/WebP in `public/` (path starts with `/`).
 * Used only if no Lottie is configured above.
 */
const MOBILE_GATE_ILLUSTRATION_SRC: string | null = null

/** Full-screen gate for narrow viewports — visibility enforced in `index.css` (`.ai-mobile-gate`). */
export function MobileBlockScreen() {
  return (
    <div
      className="ai-mobile-gate"
      role="alert"
      aria-live="polite"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-heading) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative w-full max-w-[280px] animate-fade-in-up">
        <DesktopIllustration />
      </div>

      <div className="relative max-w-sm space-y-3 animate-fade-in-up stagger-2">
        <h1 className="text-[22px] sm:text-[26px] font-display font-bold text-heading leading-tight tracking-tight">
          My guy try desktop
        </h1>
        <p className="text-[13px] text-muted font-mono leading-relaxed">
          AI Roadmap is laid out for keyboard-wide screens. Open this on a laptop or desktop.
        </p>
      </div>
    </div>
  )
}

const lottieBoxClass =
  'w-full max-w-[280px] mx-auto max-h-[min(40vh,240px)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]'

function DesktopIllustration() {
  if (MOBILE_GATE_LOTTIE_INLINE) {
    return (
      <Lottie
        animationData={MOBILE_GATE_LOTTIE_INLINE}
        loop
        className={lottieBoxClass}
        aria-hidden
      />
    )
  }

  if (MOBILE_GATE_LOTTIE_URL) {
    return <MobileGateLottieFromUrl url={MOBILE_GATE_LOTTIE_URL} />
  }

  if (MOBILE_GATE_ILLUSTRATION_SRC) {
    return (
      <img
        src={MOBILE_GATE_ILLUSTRATION_SRC}
        alt=""
        width={320}
        height={220}
        draggable={false}
        className="w-full h-auto max-h-[min(40vh,220px)] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
        aria-hidden
      />
    )
  }

  return <DefaultDesktopIllustration />
}

function MobileGateLottieFromUrl({ url }: { url: string }) {
  const [data, setData] = useState<object | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    setData(null)
    setFailed(false)
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error('lottie fetch failed')
        return r.json()
      })
      .then(json => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [url])

  if (failed) {
    return <DefaultDesktopIllustration />
  }

  if (!data) {
    return <div className={`${lottieBoxClass} min-h-[160px]`} aria-hidden />
  }

  return <Lottie animationData={data} loop className={lottieBoxClass} aria-hidden />
}

function DefaultDesktopIllustration() {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
      aria-hidden
    >
      <defs>
        <linearGradient id="desk-screen" x1="40" y1="36" x2="280" y2="164" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A1A1A" />
          <stop offset="1" stopColor="#252525" />
        </linearGradient>
        <linearGradient id="desk-accent" x1="160" y1="0" x2="160" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5E6AD2" stopOpacity="0.35" />
          <stop offset="1" stopColor="#5E6AD2" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Glow */}
      <ellipse cx="160" cy="188" rx="120" ry="18" fill="url(#desk-accent)" />
      {/* Stand */}
      <path
        d="M132 168h56l-8 32H140l-8-32Z"
        fill="#1A1A1A"
        stroke="#303030"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect x="96" y="188" width="128" height="8" rx="3" fill="#151515" stroke="#252525" strokeWidth="1.2" />
      {/* Monitor bezel */}
      <rect x="32" y="24" width="256" height="152" rx="14" fill="#151515" stroke="#303030" strokeWidth="1.5" />
      <rect x="44" y="36" width="232" height="128" rx="8" fill="url(#desk-screen)" stroke="#252525" strokeWidth="1" />
      {/* Screen content hint */}
      <rect x="60" y="52" width="88" height="6" rx="3" fill="#5E6AD2" opacity="0.5" />
      <rect x="60" y="66" width="160" height="4" rx="2" fill="#6B7280" opacity="0.35" />
      <rect x="60" y="76" width="140" height="4" rx="2" fill="#6B7280" opacity="0.25" />
      <rect x="60" y="86" width="120" height="4" rx="2" fill="#6B7280" opacity="0.2" />
      <rect x="60" y="108" width="200" height="44" rx="6" fill="#101010" stroke="#303030" strokeWidth="1" />
      <path
        d="M76 132l24-16 20 14 28-22 36 28"
        stroke="#5E6AD2"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      {/* Camera dot */}
      <circle cx="160" cy="32" r="3" fill="#252525" stroke="#303030" strokeWidth="1" />
    </svg>
  )
}

