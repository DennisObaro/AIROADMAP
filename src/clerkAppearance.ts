import { dark } from '@clerk/themes'

/**
 * Clerk prebuilt dark theme fixes OAuth row text (e.g. “Continue with Google”)
 * on dark UIs. We layer StackAI colors on top.
 */
export const clerkAppearance = {
  ...dark,
  variables: {
    ...dark.variables,
    colorPrimary: '#5E6AD2',
    colorPrimaryForeground: '#ffffff',
    colorBackground: '#151515',
    colorInput: '#1A1A1A',
    colorInputForeground: '#E6EAF0',
    colorForeground: '#E6EAF0',
    colorNeutral: '#E6EAF0',
    colorDanger: '#E5484D',
    colorSuccess: '#50C878',
    colorWarning: '#D4A04E',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-body), system-ui, sans-serif',
  },
  elements: {
    ...dark.elements,
    card: 'border border-border rounded-xl',
    headerTitle: 'font-display text-heading',
    headerSubtitle: 'text-muted',
    socialButtonsBlockButton: 'border-border bg-surface-hover hover:bg-surface-raised',
    formButtonPrimary: 'bg-accent hover:bg-accent-dim',
    footerActionLink: 'text-accent hover:text-accent-dim',
    identityPreviewEditButton: 'text-accent',
  },
}
