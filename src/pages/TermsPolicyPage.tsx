import { PolicyLayout } from "@/components/app/PolicyLayout"
import { termsPolicy } from "@/lib/policies"

export function TermsPolicyPage() {
  return <PolicyLayout policy={termsPolicy} />
}
