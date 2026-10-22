import { PolicyLayout } from "@/components/app/PolicyLayout"
import { shippingPolicy } from "@/lib/policies"

export function ShippingPolicyPage() {
  return <PolicyLayout policy={shippingPolicy} />
}
