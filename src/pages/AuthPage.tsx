
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex flex-col bg-background font-body">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <h1 className="font-display text-2xl font-bold">{isLogin ? "Welcome back" : "Create your account"}</h1>
            <CardDescription className="text-muted-foreground">
              {isLogin ? "Sign in to your account" : "Start building your custom keyboard"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="mr-2">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.334,0-6.033-2.701-6.033-6.032s2.699-6.032,6.033-6.032c1.518,0,2.818,0.531,3.786,1.372l2.91-2.91C15.732,1.224,14.187,0,12.545,0C7.337,0,3.108,4.229,3.108,9.437c0,5.208,4.23,9.437,9.437,9.437c5.181,0,9.066-3.401,9.066-7.839h-2.581c0,2.291-1.508,4.142-3.796,4.142c-2.098,0-3.722-1.573-3.722-3.722c0-2.282,1.806-4.002,3.907-4.002h3.523L12.545,10.239z" />
              </svg>
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full">{isLogin ? "Sign in" : "Create account"}</Button>
            </form>

            <p className="text-sm text-muted-foreground text-center">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Button variant="ghost" size="sm" className="p-0" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Create one" : "Sign in"}
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}