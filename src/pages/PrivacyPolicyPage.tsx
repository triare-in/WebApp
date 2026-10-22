import { PolicyLayout } from "@/components/app/PolicyLayout"
import { privacyPolicy } from "@/lib/policies"

export function PrivacyPolicyPage() {
  return <PolicyLayout policy={privacyPolicy} />
}
