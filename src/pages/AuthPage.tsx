import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Field } from "@/components/app/Field"
import { PageContainer } from "@/components/app/PageContainer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast.info(isForgotPassword
      ? "Password reset is not connected in this preview."
      : "Authentication is not connected in this preview.")
  }

  return (
    <PageContainer className="flex flex-col items-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {isForgotPassword ? "Reset your password" : isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <CardDescription>
            {isForgotPassword
              ? "Enter your email to request a password reset."
              : isLogin ? "Sign in to your account" : "Start building your custom keyboard"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isForgotPassword && (
            <>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toast.info("Sign-in is not connected in this preview.")}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
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
            </>
          )}

          <form className="space-y-4" onSubmit={submitAuth}>
            <Field id="email" label="Email">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </Field>
            {!isForgotPassword && (
              <Field id="password" label="Password">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                  >
                    {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </Button>
                </div>
              </Field>
            )}
            <Button type="submit" className="w-full">
              {isForgotPassword ? "Request password reset" : isLogin ? "Sign in" : "Create account"}
            </Button>
          </form>

          {isForgotPassword ? (
            <Button variant="link" className="h-auto p-0" onClick={() => setIsForgotPassword(false)}>
              Back to sign in
            </Button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" className="h-auto p-0" onClick={() => setIsLogin((login) => !login)}>
                {isLogin ? "Create one" : "Sign in"}
              </Button>
              {isLogin && (
                <Button variant="link" className="h-auto p-0" onClick={() => setIsForgotPassword(true)}>
                  Forgot password?
                </Button>
              )}
            </div>
          )}
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our <Link className="text-primary underline underline-offset-4" to="/policies/terms">Terms</Link> and <Link className="text-primary underline underline-offset-4" to="/policies/privacy">Privacy policy</Link>.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
