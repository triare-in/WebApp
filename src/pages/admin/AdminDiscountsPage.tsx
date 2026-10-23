
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Copy, Trash2, Percent } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const initialDiscounts = [
  { code: "WELCOME10", percent: "10%", uses: "124", expires: "Dec 2026", active: true },
  { code: "REVARA20", percent: "20%", uses: "45", expires: "Nov 2026", active: true },
  { code: "SUMMER15", percent: "15%", uses: "89", expires: "Sep 2026", active: false },
]

export function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState(initialDiscounts)

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success("Discount code copied")
    } catch (error) {
      console.error("Could not copy discount code", error)
      toast.error("Could not copy the discount code.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Discount codes</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create code
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Active codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {discounts.map((discount) => (
              <div key={discount.code} className="flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono font-medium">{discount.code}</p>
                    <p className="text-sm text-muted-foreground">{discount.percent} off · {discount.uses} uses · Expires {discount.expires}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Badge variant={discount.active ? "success" : "secondary"}>{discount.active ? "Active" : "Expired"}</Badge>
                  <Button variant="ghost" size="icon" aria-label={`Copy code ${discount.code}`} onClick={() => void copyCode(discount.code)}>
                    <Copy className="size-4" aria-hidden="true" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Delete code ${discount.code}`}>
                        <Trash2 className="size-4" aria-hidden="true" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {discount.code}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This discount code will be removed from the preview.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => setDiscounts((current) => current.filter((item) => item.code !== discount.code))}
                        >
                          Delete code
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}