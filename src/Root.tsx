import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import App from './App'
import { LoginScreen } from './components/LoginScreen'
import { MissingClerkKeyScreen } from './components/MissingClerkKeyScreen'

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

export default function Root() {
  if (!publishableKey) {
    return <MissingClerkKeyScreen />
  }

  return (
    <ClerkProvider publishableKey={publishableKey} afterSignOutUrl="/">
      <SignedOut>
        <LoginScreen />
      </SignedOut>
      <SignedIn>
        <App />
      </SignedIn>
    </ClerkProvider>
  )
}
