
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export function NotFoundPage() {
  return (
    <div className="flex flex-col bg-background font-body">
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <h1 className="font-display text-8xl font-bold text-muted-foreground/30">404</h1>
          </div>
          <h2 className="font-display text-2xl font-bold mb-4">Page not found</h2>
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
      </div>
    </div>
  )
}