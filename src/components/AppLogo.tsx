/**
 * StackAI mark — same asset as the site favicon (`public/favicon.png`).
 */
export function AppLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/favicon.png"
      alt="StackAI"
      width={40}
      height={40}
      decoding="async"
      className={`h-10 w-10 rounded-xl object-cover border border-border shrink-0 ${className}`}
    />
  )
}
