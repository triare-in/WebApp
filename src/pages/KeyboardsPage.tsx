"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"

const presets = [
  { id: "1", name: "75% Lilac Aluminium", layout: "75", caseColor: "#B9A6E8", keycapColor: "#F3EEE3", price: "₹12,499", badge: "Best seller" },
  { id: "2", name: "65% Sakura Polycarbonate", layout: "65", caseColor: "#F4C9DA", keycapColor: "#F3EEE3", price: "₹8,999", badge: "" },
  { id: "3", name: "100% Ivory Polycarbonate", layout: "100", caseColor: "#F3EEE3", keycapColor: "#B9A6E8", price: "₹12,999", badge: "" },
]

export function KeyboardsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">

      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-8">Keyboards</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {presets.map((preset) => (
              <Card key={preset.id} className="overflow-hidden hover:bg-accent/50 transition-colors cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <KeyboardPreview
                      layout={preset.layout as "65" | "75" | "100"}
                      caseColor={preset.caseColor}
                      keycapColor={preset.keycapColor}
                      className="w-full h-full"
                    />
                    {preset.badge && (
                      <span className="absolute left-2 top-2 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                        {preset.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-medium mb-1">{preset.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{preset.layout} layout</p>
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold tabular-nums">{preset.price}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/customize/${preset.layout}`}>Customize</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

    </div>
  )
}