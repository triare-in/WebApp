import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Button } from "@/components/ui/button"
import { getLayoutSpec, getPresetPrice, KEYBOARD_PRESETS } from "@/lib/catalog"

export function KeyboardsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Made to order · built to be repaired</p>
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Choose a starting point</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Each preset opens in the configurator. Change the case, switches and keycaps before you decide.
        </p>
      </header>

      <div className="divide-y divide-border border-y border-border">
        {KEYBOARD_PRESETS.map((preset, index) => {
          const layout = getLayoutSpec(preset.layout)
          return (
            <article
              key={preset.id}
              className="grid items-center gap-6 py-7 md:grid-cols-[3rem_15rem_minmax(0,1fr)_auto] md:gap-8"
            >
              <span className="hidden font-mono text-sm text-muted-foreground md:block">
                0{index + 1}
              </span>
              <Link
                to={`/customize/${preset.layout}`}
                aria-label={`Customize ${preset.name}`}
                className="block rounded-xl bg-muted/60 p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <KeyboardPreview
                  layout={preset.layout}
                  caseColor={preset.caseColor}
                  keycapColor={preset.keycapColor}
                />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-xl font-semibold">{preset.name}</h2>
                  {"badge" in preset && preset.badge && (
                    <span className="text-xs font-medium uppercase tracking-wide text-primary">{preset.badge}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {layout.keyCount} keys · {preset.case.toLowerCase()} case · {preset.layout}% ANSI
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hot-swap sockets, wireless ZMK firmware, replaceable parts.
                </p>
              </div>
              <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
                <span className="font-display text-lg font-semibold tabular-nums">
                  {`₹${new Intl.NumberFormat("en-IN").format(getPresetPrice(preset.layout, preset.case))}`}
                </span>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/customize/${preset.layout}`}>
                    Customize <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Prices include the selected preset parts. Your final total updates as you change options.
      </p>
    </div>
  )
}
