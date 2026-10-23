import { Link } from "react-router-dom"
import { ShoppingCart, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Button } from "@/components/ui/button"
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
import { useCart } from "@/hooks/use-cart"
import { useSavedDesigns } from "@/hooks/use-saved-designs"
import { PageContainer } from "@/components/app/PageContainer"
import { formatPrice } from "@/lib/catalog"

const dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" })

export function SavedDesignsPage() {
  const { designs, removeDesign } = useSavedDesigns()
  const { addItem } = useCart()

  const handleRemove = (id: string) => {
    if (!removeDesign(id)) toast.error("Could not remove this design.")
  }

  const handleAddToCart = (design: (typeof designs)[number]) => {
    const result = addItem({
      layout: design.layout,
      case: design.case,
      keycaps: design.keycaps,
      switch: design.switch,
      price: design.price,
      caseColor: design.caseColor,
      keycapColor: design.keycapColor,
    })
    if (result === "duplicate") {
      toast.info("This build is already in your cart")
    } else if (result) {
      toast.success("Added to cart")
    } else {
      toast.error("Could not add this build to your cart.")
    }
  }

  return (
    <PageContainer>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Your builds, kept on this device</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Saved designs</h1>
        </div>
        <Button asChild><Link to="/customize">Start a design</Link></Button>
      </header>

      {designs.length === 0 ? (
        <div className="border-y border-border py-12">
          <h2 className="font-display text-xl font-semibold">Nothing saved yet</h2>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Save a configuration from the configurator and it will appear here for your next visit.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {designs.map((design) => (
            <article key={design.id} className="grid items-center gap-5 py-5 sm:grid-cols-[12rem_minmax(0,1fr)_auto]">
              <div className="rounded-lg bg-muted/60 p-3">
                <KeyboardPreview layout={design.layout} caseColor={design.caseColor} keycapColor={design.keycapColor} />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold">{design.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {design.layout}% · {design.case} · {design.switch} switches · {design.keycaps} keycaps
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Saved {dateFormatter.format(new Date(design.createdAt))}
                </p>
                <p className="mt-2 font-medium tabular-nums">{formatPrice(design.price)}</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <Button onClick={() => handleAddToCart(design)}>
                  <ShoppingCart className="size-4" aria-hidden="true" />
                  Add to cart
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="outline" asChild>
                    <Link to={`/customize/design/${encodeURIComponent(design.id)}`}>Continue building</Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label={`Delete ${design.name}`}>
                        <Trash2 className="size-4" aria-hidden="true" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {design.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This saved design will be removed from this device.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => handleRemove(design.id)}
                        >
                          Delete design
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
