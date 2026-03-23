export function MissingClerkKeyScreen() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-6 py-12 text-center max-w-lg mx-auto">
      <div className="w-10 h-10 rounded-xl bg-surface-raised flex items-center justify-center border border-border mb-6">
        <span className="text-accent font-bold text-[11px] font-mono">SA</span>
      </div>
      <h1 className="text-heading font-display font-bold text-xl mb-3">Authentication not configured</h1>
      <p className="text-muted text-sm leading-relaxed mb-6">
        Add your Clerk publishable key to a <code className="text-accent font-mono text-xs">.env</code> file:
      </p>
      <pre className="w-full text-left text-[11px] font-mono bg-surface-raised border border-border rounded-xl p-4 text-text overflow-x-auto">
        {`VITE_CLERK_PUBLISHABLE_KEY=pk_test_...`}
      </pre>
      <p className="text-muted text-xs mt-6">
        Create a free app at{' '}
        <a href="https://dashboard.clerk.com" className="text-accent hover:underline" target="_blank" rel="noreferrer">
          clerk.com
        </a>
        , then copy the key from API Keys.
      </p>
    </div>
  )
}
