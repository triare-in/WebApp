import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Bookmark, Check, ChevronDown, ShoppingCart, Star } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { isLayout, useCart } from "@/hooks/use-cart"
import { useSavedDesigns } from "@/hooks/use-saved-designs"
import { CASE_COLORS, DEFAULT_BATTERY_CAPACITY_MAH, formatPrice, getLayoutSpec, LAYOUTS } from "@/lib/catalog"
import { toast } from "sonner"

type Case = "Aluminium" | "Polycarbonate"
type Switch = "Linear" | "Tactile" | "Clicky"

export function ConfiguratorPage() {
  const { layout } = useParams<{ layout: string }>()
  const navigate = useNavigate()
  const initialLayout = isLayout(layout) ? layout : "75"
  const selectedLayout = initialLayout
  const { addItem } = useCart()
  const { saveDesign } = useSavedDesigns()
  const [selectedCase, setSelectedCase] = useState<Case>(initialLayout === "75" ? "Aluminium" : "Polycarbonate")
  const [caseColor, setCaseColor] = useState(initialLayout === "65" ? "#F4C9DA" : initialLayout === "100" ? "#F3EEE3" : "#B9A6E8")
  const [keycapColor, setKeycapColor] = useState(initialLayout === "100" ? "#B9A6E8" : "#F3EEE3")
  const [selectedSwitch, setSelectedSwitch] = useState<Switch>("Linear")
  const [addedToCart, setAddedToCart] = useState(false)
  const [cartError, setCartError] = useState("")

  const layoutOption = getLayoutSpec(selectedLayout)
  const casePrice = selectedCase === "Aluminium" ? layoutOption.aluminiumUpgrade : 0
  const switchPrice = selectedSwitch === "Linear" ? layoutOption.linearSwitchUpgrade : 0
  const total = layoutOption.basePrice + casePrice + switchPrice

  const chooseLayout = (value: (typeof LAYOUTS)[number]["id"]) => {
    setAddedToCart(false)
    setCartError("")
    navigate(`/customize/${value}`)
  }

  const addToCart = () => {
    setCartError("")
    const added = addItem({
      layout: selectedLayout,
      case: selectedCase,
      keycaps: CASE_COLORS.find((item) => item.color === keycapColor)?.label ?? "Custom",
      switch: selectedSwitch,
      price: total,
      caseColor,
      keycapColor,
    })
    if (added) {
      setAddedToCart(true)
      return true
    } else {
      setAddedToCart(false)
      setCartError("Could not save this build to your cart. Please try again.")
      return false
    }
  }

  const saveCurrentDesign = () => {
    const saved = saveDesign({
      name: `${CASE_COLORS.find((item) => item.color === caseColor)?.label ?? "Custom"} ${selectedLayout}%`,
      layout: selectedLayout,
      case: selectedCase,
      keycaps: CASE_COLORS.find((item) => item.color === keycapColor)?.label ?? "Custom",
      switch: selectedSwitch,
      price: total,
      caseColor,
      keycapColor,
    })
    if (saved) {
      toast.success("Design saved", { description: "Find it in your saved designs." })
    } else {
      toast.error("Could not save this design. Please try again.")
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/keyboards" className="hover:text-primary">Keyboards</Link>
            <span aria-hidden="true">/</span>
            <span>Customize</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Customize your {selectedLayout}%
            </h1>
            <Badge variant="secondary">Custom build</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Wireless · hot-swap · repairable. Start from a preset, change anything.
          </p>
        </div>
        <p className="font-display text-2xl font-bold tabular-nums">{formatPrice(total)}</p>
      </div>

      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.85fr)]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-5 inline-flex rounded-lg border border-border p-1" aria-label="Keyboard layout">
            {LAYOUTS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selectedLayout === item.id}
                onClick={() => chooseLayout(item.id)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm transition-colors",
                  selectedLayout === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="rounded-xl bg-muted/60 p-3 sm:p-6">
            <KeyboardPreview
              layout={selectedLayout}
              caseColor={caseColor}
              keycapColor={keycapColor}
              className="w-full"
            />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm">
            <div className="flex items-center gap-5 text-muted-foreground">
              <span className="font-medium text-primary">Top</span>
              <span>Back</span>
              <span>Parts</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {layoutOption.keyCount} keys · ANSI
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Preview is illustrative. Final product may vary slightly.
          </p>
        </section>

        <div className="space-y-4">
          <section className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            <details open className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">1 · </span>Layout <span className="text-muted-foreground">— {selectedLayout}%</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground">
                {layoutOption.keyCount} keys · compact ANSI layout
              </div>
            </details>

            <details open className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">2 · </span>Case <span className="text-muted-foreground">— {selectedCase} · {CASE_COLORS.find((item) => item.color === caseColor)?.label}</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-4 px-4 pb-4">
                <div className="grid gap-2">
                  {(["Aluminium", "Polycarbonate"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      aria-pressed={selectedCase === item}
                      onClick={() => {
                        setSelectedCase(item)
                        setCaseColor(item === "Aluminium" ? "#B9A6E8" : "#F3EEE3")
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-lg border bg-background p-3 text-left",
                        selectedCase === item && "border-primary ring-1 ring-primary",
                      )}
                    >
                      <span>
                        <span className="block text-sm font-semibold">{item}</span>
                        <span className="text-xs text-muted-foreground">
                          {item === "Aluminium" ? "Heavier, solid sound" : "Light, softer sound"}
                        </span>
                      </span>
                      <span className="text-sm tabular-nums">
                        {item === "Aluminium" ? `+${formatPrice(layoutOption.aluminiumUpgrade)}` : "Included"}
                      </span>
                    </button>
                  ))}
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-medium">Colourway</legend>
                  <div className="flex flex-wrap gap-2">
                    {CASE_COLORS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        aria-label={`${item.label} case color`}
                        aria-pressed={caseColor === item.color}
                        onClick={() => setCaseColor(item.color)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border border-border px-2.5 py-2 text-xs",
                          caseColor === item.color && "border-primary ring-1 ring-primary",
                        )}
                      >
                        <span className="h-3.5 w-3.5 rounded-full border border-border" style={{ backgroundColor: item.color }} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">3 · </span>Hot-swap sockets <span className="text-muted-foreground">— MX-compatible</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-4 pb-4 text-sm text-muted-foreground">Included with every build. Replace switches without soldering.</p>
            </details>

            <details open className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">4 · </span>Switches <span className="text-muted-foreground">— {selectedSwitch}</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="grid grid-cols-3 gap-2 px-4 pb-4">
                {(["Linear", "Tactile", "Clicky"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selectedSwitch === item}
                    onClick={() => setSelectedSwitch(item)}
                    className={cn(
                      "rounded-lg border border-border px-2 py-2 text-sm",
                      selectedSwitch === item && "border-primary bg-accent text-accent-foreground",
                    )}
                  >
                    {item}
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {item === "Linear" ? `+${formatPrice(layoutOption.linearSwitchUpgrade)}` : "Included"}
                    </span>
                  </button>
                ))}
              </div>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">5 · </span>Keycaps <span className="text-muted-foreground">— PBT</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="flex flex-wrap gap-2 px-4 pb-4">
                {CASE_COLORS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    aria-label={`${item.label} keycaps`}
                    aria-pressed={keycapColor === item.color}
                    onClick={() => setKeycapColor(item.color)}
                    className={cn(
                      "rounded-full border-2 border-transparent p-1",
                      keycapColor === item.color && "border-primary",
                    )}
                  >
                    <span className="block h-6 w-6 rounded-full border border-border" style={{ backgroundColor: item.color }} />
                  </button>
                ))}
              </div>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">6 · </span>Controller <span className="text-muted-foreground">— ZMK wireless</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-4 pb-4 text-sm text-muted-foreground">Bluetooth 5.2 · pairs with up to 3 devices · USB-C wired mode.</p>
            </details>

            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm">
                <span><span className="text-muted-foreground">7 · </span>Battery <span className="text-muted-foreground">— {DEFAULT_BATTERY_CAPACITY_MAH} mAh</span></span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-4 pb-4 text-sm text-muted-foreground">Included and user-replaceable.</p>
            </details>
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">{selectedLayout}% layout (base)</span><span className="tabular-nums">{formatPrice(layoutOption.basePrice)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{selectedCase} case</span><span className="tabular-nums">{casePrice ? `+${formatPrice(casePrice)}` : "Included"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">{selectedSwitch} switches</span><span className="tabular-nums">{switchPrice ? `+${formatPrice(switchPrice)}` : "Included"}</span></div>
              <p className="text-xs text-muted-foreground">Sockets · keycaps · controller · battery · PCB included</p>
            </div>
            <div className="my-3 flex items-center justify-between border-t border-border pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold tabular-nums">{formatPrice(total)}</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">Ships in about 10–14 days</p>
            <Button className="h-12 w-full" onClick={addToCart}>
              {addedToCart ? <><Check className="mr-2 h-4 w-4" /> Added to cart</> : <><ShoppingCart className="mr-2 h-4 w-4" /> Add to cart</>}
            </Button>
            {cartError && <p role="alert" className="mt-2 text-sm text-destructive">{cartError}</p>}
            <div className="mt-2 flex gap-2">
              <Button variant="secondary" className="flex-1" onClick={() => { if (addToCart()) navigate("/checkout") }}>
                Buy now
              </Button>
              <Button variant="ghost" className="flex-1" onClick={saveCurrentDesign}>
                <Bookmark className="mr-2 h-4 w-4" /> Save design
              </Button>
            </div>
            {addedToCart && (
              <Link to="/cart" className="mt-3 flex items-center justify-center gap-1 text-sm text-primary hover:underline">
                View cart <ShoppingCart className="h-3.5 w-3.5" />
              </Link>
            )}
          </section>
        </div>
      </div>

      <section className="mt-8 rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 font-display text-xl font-semibold">What you can swap later</h2>
        <div className="grid grid-cols-2 gap-3 text-center text-sm sm:grid-cols-5">
          {["Case", "Sockets", "Switches", "Keycaps", "Battery"].map((part) => (
            <div key={part} className="rounded-lg bg-muted/50 p-4">
              <Check className="mx-auto mb-2 h-4 w-4 text-primary" />
              {part}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Reviews</h2>
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5">
          <div className="text-center">
            <p className="font-display text-3xl font-bold">4.7</p>
            <div className="flex text-warning" aria-label="4.7 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">212 ratings</p>
          </div>
          <p className="min-w-0 flex-1 text-sm text-muted-foreground">
            “No soldering, no prying. Popped the plate off, pulled out the old sockets, dropped in tactile switches. The included tool actually fits.”
          </p>
          <Link to="/support" className="text-sm text-primary hover:underline">All reviews</Link>
        </div>
      </section>
    </div>
  )
}
