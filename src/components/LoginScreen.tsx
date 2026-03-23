import { SignIn } from '@clerk/clerk-react'
import { AppLogo } from './AppLogo'

export function LoginScreen() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md mb-10 text-center">
        <div className="flex items-center justify-center gap-3.5 mb-3">
          <AppLogo />
          <h1 className="text-heading font-display font-bold text-[20px] tracking-tight">StackAI</h1>
        </div>
        <p className="text-muted text-[13px] font-mono tracking-wide uppercase">Sign in to continue</p>
      </div>

      <div className="w-full max-w-[420px] [&_.cl-card]:shadow-none [&_.cl-card]:border-border [&_.cl-card]:bg-surface-raised">
        {/* Appearance comes from ClerkProvider (clerkAppearance.ts) — includes @clerk/themes dark for OAuth label contrast */}
        <SignIn fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" />
      </div>
    </div>
  )
}
