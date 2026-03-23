import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { clerkAppearance } from './clerkAppearance'
import App from './App'
import { LoginScreen } from './components/LoginScreen'
import { MissingClerkKeyScreen } from './components/MissingClerkKeyScreen'

const publishableKey = String(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '').trim()

export default function Root() {
  if (!publishableKey) {
    return <MissingClerkKeyScreen />
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
      appearance={clerkAppearance}
    >
      <SignedOut>
        <LoginScreen />
      </SignedOut>
      <SignedIn>
        <App />
      </SignedIn>
    </ClerkProvider>
  )
}
