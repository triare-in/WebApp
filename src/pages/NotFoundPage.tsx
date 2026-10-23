
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { PageContainer } from "@/components/app/PageContainer"

export function NotFoundPage() {
  return (
    <PageContainer className="py-24">
      <div className="mx-auto max-w-md text-center">
        <img src="/404.svg" alt="" aria-hidden="true" className="mx-auto mb-8 w-full max-w-64" />
        <h1 className="mb-4 font-display text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/keyboards">
              <Search className="mr-2 h-4 w-4" />
              Browse keyboards
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}