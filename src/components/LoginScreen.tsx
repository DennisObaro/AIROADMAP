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
        <SignIn
          fallbackRedirectUrl="/"
          signUpFallbackRedirectUrl="/"
          appearance={{
            variables: {
              colorPrimary: '#5E6AD2',
              colorBackground: '#151515',
              colorInputBackground: '#1A1A1A',
              colorInputText: '#E6EAF0',
              colorText: '#9BA3AF',
              colorTextSecondary: '#6B7280',
              colorDanger: '#E5484D',
              colorSuccess: '#50C878',
              colorWarning: '#D4A04E',
              borderRadius: '0.75rem',
              fontFamily: 'var(--font-body), system-ui, sans-serif',
            },
            elements: {
              card: 'border border-border rounded-xl',
              headerTitle: 'font-display text-heading',
              headerSubtitle: 'text-muted',
              socialButtonsBlockButton: 'border-border bg-surface-hover hover:bg-surface-raised',
              formButtonPrimary: 'bg-accent hover:bg-accent-dim',
              footerActionLink: 'text-accent hover:text-accent-dim',
              identityPreviewEditButton: 'text-accent',
            },
          }}
        />
      </div>
    </div>
  )
}
