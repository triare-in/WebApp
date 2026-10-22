import { PolicyLayout } from "@/components/app/PolicyLayout"
import { warrantyPolicy } from "@/lib/policies"

export function WarrantyPolicyPage() {
  return <PolicyLayout policy={warrantyPolicy} />
}
