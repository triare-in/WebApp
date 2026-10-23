import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Bookmark, Check, ShoppingCart } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { ColorSwatch } from "@/components/app/ColorSwatch"
import { PageContainer } from "@/components/app/PageContainer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { isLayout, useCart } from "@/hooks/use-cart"
import { isSavedLayout, useSavedDesigns } from "@/hooks/use-saved-designs"
import { CASE_COLORS, DEFAULT_BATTERY_CAPACITY_MAH, formatPrice, getLayoutSpec, KEYBOARD_PRESETS, LAYOUTS } from "@/lib/catalog"
import { toast } from "sonner"

type Case = "Aluminium" | "Polycarbonate"
type Switch = "Linear" | "Tactile" | "Clicky"

const SHOW_SAMPLE_REVIEWS = false // Never present invented reviews as verified-buyer feedback.

export function ConfiguratorPage() {
  const { layout, slug, designId } = useParams<{ layout?: string; slug?: string; designId?: string }>()
  const navigate = useNavigate()
  const { designs, saveDesign } = useSavedDesigns()
  const routeDesign = designs.find((design) => design.id === designId)
  const routePreset = KEYBOARD_PRESETS.find((item) => item.id === slug)
  useEffect(() => {
    if (designId && !routeDesign) {
      toast.error("Saved design not found.")
      navigate("/account/designs", { replace: true })
    }
  }, [designId, navigate, routeDesign])
  const selectedLayout = isLayout(layout)
    ? layout
    : routeDesign && isSavedLayout(routeDesign.layout)
      ? routeDesign.layout
      : routePreset?.layout ?? "75"
  const { addItem } = useCart()
  const [selectedCase, setSelectedCase] = useState<Case>(
    routeDesign?.case === "Aluminium" || routeDesign?.case === "Polycarbonate"
      ? routeDesign.case
      : routePreset?.case ?? (selectedLayout === "75" ? "Aluminium" : "Polycarbonate")
  )
  const [caseColor, setCaseColor] = useState<string>(
    routeDesign?.caseColor ?? routePreset?.caseColor ?? (selectedLayout === "65" ? "#F4C9DA" : selectedLayout === "100" ? "#F3EEE3" : "#B9A6E8")
  )
  const [keycapColor, setKeycapColor] = useState<string>(
    routeDesign?.keycapColor ?? routePreset?.keycapColor ?? (selectedLayout === "100" ? "#B9A6E8" : "#F3EEE3")
  )
  const [selectedSwitch, setSelectedSwitch] = useState<Switch>(
    routeDesign?.switch === "Linear" || routeDesign?.switch === "Tactile" || routeDesign?.switch === "Clicky"
      ? routeDesign.switch
      : routePreset?.switch ?? "Linear"
  )
  const [lastAddedSignature, setLastAddedSignature] = useState<string | null>(null)
  const [cartError, setCartError] = useState("")

  const layoutOption = getLayoutSpec(selectedLayout)
  const casePrice = selectedCase === "Aluminium" ? layoutOption.aluminiumUpgrade : 0
  const switchPrice = selectedSwitch === "Linear" ? layoutOption.linearSwitchUpgrade : 0
  const total = layoutOption.basePrice + casePrice + switchPrice
  const caseColorName = CASE_COLORS.find((item) => item.color === caseColor)?.label ?? "Custom"
  const keycapColorName = CASE_COLORS.find((item) => item.color === keycapColor)?.label ?? "Custom"
  const signature = JSON.stringify([selectedLayout, selectedCase, caseColor, keycapColor, selectedSwitch])
  const addedToCart = signature === lastAddedSignature

  const chooseLayout = (value: (typeof LAYOUTS)[number]["id"]) => {
    setCartError("")
    navigate(`/customize/${value}`)
  }

  const addToCart = () => {
    setCartError("")
    const result = addItem({
      layout: selectedLayout,
      case: selectedCase,
      keycaps: keycapColorName,
      switch: selectedSwitch,
      price: total,
      caseColor,
      keycapColor,
    })
    if (result === "duplicate") {
      toast.info("This build is already in your cart")
      setLastAddedSignature(signature)
      return true
    }
    if (result) {
      setLastAddedSignature(signature)
      return true
    }

    setCartError("Could not save this build to your cart. Please try again.")
    return false
  }

  const saveCurrentDesign = () => {
    const saved = saveDesign({
      name: `${caseColorName} ${selectedLayout}%`,
      layout: selectedLayout,
      case: selectedCase,
      keycaps: keycapColorName,
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
    <>
      <PageContainer className="pb-28 lg:py-8">
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
          <section className="self-start rounded-xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="sr-only">Keyboard preview</h2>
            <ToggleGroup
              type="single"
              value={selectedLayout}
              onValueChange={(value) => { if (isLayout(value)) chooseLayout(value) }}
              aria-label="Keyboard layout"
              className="mb-5 inline-flex rounded-lg border border-border p-1"
            >
              {LAYOUTS.map((item) => (
                <ToggleGroupItem key={item.id} value={item.id} aria-label={`${item.label} keyboard layout`}>
                  {item.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="rounded-xl bg-muted/60 p-3 sm:p-6">
              <KeyboardPreview
                layout={selectedLayout}
                caseColor={caseColor}
                keycapColor={keycapColor}
                caseName={caseColorName}
                keycapName={keycapColorName}
              />
            </div>
            <p className="mt-4 text-right text-xs text-muted-foreground">
              {layoutOption.keyCount} keys · ANSI
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Preview is illustrative. Final product may vary slightly.
            </p>
          </section>

          <div className="space-y-4">
            <section className="overflow-hidden rounded-xl border border-border bg-card">
              <h2 className="sr-only">Build options</h2>
              <Accordion type="multiple" defaultValue={["case", "switches"]}>
                <AccordionItem value="layout">
                  <AccordionTrigger className="px-4">
                    <span>1 · Layout <span className="text-muted-foreground">· {selectedLayout}%</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    {layoutOption.keyCount} keys · compact ANSI layout
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="case">
                  <AccordionTrigger className="px-4">
                    <span>2 · Case <span className="text-muted-foreground">· {selectedCase}, {caseColorName}</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 px-4 pb-4">
                    <RadioGroup
                      value={selectedCase}
                      onValueChange={(value) => {
                        if (value === "Aluminium" || value === "Polycarbonate") setSelectedCase(value)
                      }}
                      className="grid gap-2"
                    >
                      {(["Aluminium", "Polycarbonate"] as const).map((item) => {
                        const selected = selectedCase === item
                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary"
                          >
                            <RadioGroupItem value={item} aria-label={`${item} case`} />
                            <span className="flex-1">
                              <span className="block text-sm font-semibold">{item}</span>
                              <span className="text-xs text-muted-foreground">
                                {item === "Aluminium" ? "Heavier, solid sound" : "Light, softer sound"}
                              </span>
                            </span>
                            <span className="text-sm tabular-nums">
                              {item === "Aluminium" ? `+${formatPrice(layoutOption.aluminiumUpgrade)}` : "Included"}
                            </span>
                            {selected && <Check className="size-4 text-primary" aria-hidden="true" />}
                          </label>
                        )
                      })}
                    </RadioGroup>
                    <fieldset>
                      <legend className="mb-2 text-sm font-medium">Case colourway</legend>
                      <RadioGroup
                        value={caseColor}
                        onValueChange={setCaseColor}
                        className="grid grid-cols-2 gap-2"
                      >
                        {CASE_COLORS.map((item) => (
                          <ColorSwatch
                            key={item.label}
                            id={`case-color-${item.label.toLowerCase()}`}
                            value={item.color}
                            name={item.label}
                            color={item.color}
                            selected={caseColor === item.color}
                          />
                        ))}
                      </RadioGroup>
                    </fieldset>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sockets">
                  <AccordionTrigger className="px-4">
                    <span>3 · Hot-swap sockets <span className="text-muted-foreground">· MX-compatible</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    Included with every build. Replace switches without soldering.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="switches">
                  <AccordionTrigger className="px-4">
                    <span>4 · Switches <span className="text-muted-foreground">· {selectedSwitch}</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <RadioGroup
                      value={selectedSwitch}
                      onValueChange={(value) => {
                        if (value === "Linear" || value === "Tactile" || value === "Clicky") setSelectedSwitch(value)
                      }}
                      className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                    >
                      {(["Linear", "Tactile", "Clicky"] as const).map((item) => {
                        const selected = selectedSwitch === item
                        return (
                          <label
                            key={item}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary"
                          >
                            <RadioGroupItem value={item} aria-label={`${item} switches`} />
                            <span className="flex-1 text-sm">
                              {item}
                              <span className="mt-1 block text-xs text-muted-foreground">
                                {item === "Linear" ? `+${formatPrice(layoutOption.linearSwitchUpgrade)}` : "Included"}
                              </span>
                            </span>
                            {selected && <Check className="size-4 text-primary" aria-hidden="true" />}
                          </label>
                        )
                      })}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="keycaps">
                  <AccordionTrigger className="px-4">
                    <span>5 · Keycaps <span className="text-muted-foreground">· {keycapColorName} PBT</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <RadioGroup
                      value={keycapColor}
                      onValueChange={setKeycapColor}
                      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                    >
                      {CASE_COLORS.map((item) => (
                        <ColorSwatch
                          key={item.label}
                          id={`keycap-color-${item.label.toLowerCase()}`}
                          value={item.color}
                          name={item.label}
                          color={item.color}
                          selected={keycapColor === item.color}
                        />
                      ))}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="controller">
                  <AccordionTrigger className="px-4">
                    <span>6 · Controller <span className="text-muted-foreground">· ZMK wireless</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    Bluetooth 5.2 · pairs with up to 3 devices · USB-C wired mode.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="battery">
                  <AccordionTrigger className="px-4">
                    <span>7 · Battery <span className="text-muted-foreground">· {DEFAULT_BATTERY_CAPACITY_MAH} mAh</span></span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                    Included and user-replaceable.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-3"><span className="text-muted-foreground">{selectedLayout}% layout (base)</span><span className="tabular-nums">{formatPrice(layoutOption.basePrice)}</span></div>
                <div className="flex justify-between gap-3"><span className="text-muted-foreground">{selectedCase} case</span><span className="tabular-nums">{casePrice ? `+${formatPrice(casePrice)}` : "Included"}</span></div>
                <div className="flex justify-between gap-3"><span className="text-muted-foreground">{selectedSwitch} switches</span><span className="tabular-nums">{switchPrice ? `+${formatPrice(switchPrice)}` : "Included"}</span></div>
                <p className="text-xs text-muted-foreground">Sockets · keycaps · controller · battery · PCB included</p>
              </div>
              <div className="my-3 flex items-center justify-between border-t border-border pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-display text-2xl font-bold tabular-nums">{formatPrice(total)}</span>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">Ships in about 10–14 days</p>
              <Button className="w-full" onClick={addToCart}>
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

        <section className="mt-8 rounded-xl border border-border bg-card p-5">
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

        {SHOW_SAMPLE_REVIEWS && (
          <section className="mt-8">
            <h2 className="mb-3 font-display text-xl font-semibold">Reviews</h2>
            <p className="text-muted-foreground">Sample reviews are hidden until verified customer feedback is available.</p>
          </section>
        )}
      </PageContainer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-4 pt-3 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-display font-bold tabular-nums">{formatPrice(total)}</p>
          </div>
          <Button onClick={addToCart}>
            {addedToCart ? "Added to cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </>
  )
}
