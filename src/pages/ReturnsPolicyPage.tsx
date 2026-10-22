import { PolicyLayout } from "@/components/app/PolicyLayout"
import { returnsPolicy } from "@/lib/policies"

export function ReturnsPolicyPage() {
  return <PolicyLayout policy={returnsPolicy} />
}
