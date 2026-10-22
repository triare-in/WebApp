import { Link } from "react-router-dom"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Button } from "@/components/ui/button"
import { useSavedDesigns } from "@/hooks/use-saved-designs"

const dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" })

export function SavedDesignsPage() {
  const { designs, removeDesign } = useSavedDesigns()

  const handleRemove = (id: string) => {
    if (!removeDesign(id)) toast.error("Could not remove this design.")
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
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
                <p className="mt-2 font-medium tabular-nums">₹{new Intl.NumberFormat("en-IN").format(design.price)}</p>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/customize/${design.layout}`}>Continue building</Link>
                </Button>
                <Button variant="ghost" size="icon" aria-label={`Delete ${design.name}`} onClick={() => handleRemove(design.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
