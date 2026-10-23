
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { PageContainer } from "@/components/app/PageContainer"

export function NotFoundPage() {
  return (
    <PageContainer className="py-24">
        <div className="mx-auto max-w-md text-center">
          <p aria-hidden="true" className="mb-8 font-display text-8xl font-bold text-muted-foreground/30">404</p>
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight">Page not found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/keyboards">
                <Search className="h-4 w-4 mr-2" />
                Browse keyboards
              </Link>
            </Button>
          </div>
        </div>
    </PageContainer>
  )
}