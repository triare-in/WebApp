import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"
import { useLocation } from "react-router-dom"

interface AppErrorBoundaryProps {
  children: ReactNode
}

interface AppErrorBoundaryState {
  hasError: boolean
}

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application route failed to render", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold">We hit a problem</h1>
          <p className="mt-3 text-muted-foreground">Reload the page to try again.</p>
          <button
            type="button"
            className="mt-6 rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </section>
      )
    }

    return this.props.children
  }
}

export function RouteErrorBoundary({ children }: AppErrorBoundaryProps) {
  const { pathname } = useLocation()
  return <AppErrorBoundary key={pathname}>{children}</AppErrorBoundary>
}
