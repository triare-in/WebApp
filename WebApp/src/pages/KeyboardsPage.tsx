"use client"

import { Link, useSearchParams } from "react-router-dom"
import { useQuery } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup } from "@/components/ui/toggle-group"
import { Grid } from "@/components/ui/grid"
import { Tooltip } from "@/components/ui/tooltip"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import {
  MousePointer,
  Box,
  Wrench,
  Star,
  Settings,
  Loader2,
  Search,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const layouts = [
  { id: "100", name: "100%" },
  { id: "75", name: "75%" },
  { id: "65", name: "65%" },
]

const keycapColors = [
  { name: "Lilac", hex: "#B9A6E8" },
  { name: "Sakura", hex: "#F4C9DA" },
  { name: "Graphite", hex: "#3B3744" },
  { name: "Ivory", hex: "#F3EEE3" },
]

const caseMaterials = [
  { name: "Aluminium", delta: "+₹2,400", included: false },
  { name: "Polycarbonate", delta: "+₹0", included: true },
]

export function KeyboardsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: keyboards, error } = useQuery(() => supabase.from("keyboards").select("*"))

  const [selectedLayout, setSelectedLayout] = useState("75")
  const [selectedKeycapColor, setSelectedKeycapColor] = useState("Lilac")
  const [selectedCaseMaterial, setSelectedCaseMaterial] = useState("Aluminium")

  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Keyboards
          </h1>
          <div className="hidden lg:block">
            <Button variant="outline" size="sm" asChild>
              <Link to="/customize">Start a build</Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Layout filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2">
              Layout
            </label>
            <ToggleGroup
              type="radio"
              defaultValue="75"
              className="w-full"
              onValueChange={(val) => setSelectedLayout(val as string)}
            >
              {layouts.map((layout) => (
                <ToggleGroup.Item key={layout.id} value={layout.id}>
                  <span className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm">
                    {layout.name}
                  </span>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </div>

          {/* Keycap color filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2">
              Keycap colorway
            </label>
            <ToggleGroup
              type="multiple"
              multiple
              className="grid grid-cols-2 gap-2 w-full"
              onValueChange={(vals) => {
                const colors = vals as string[]
                setSelectedKeycapColor(
                  colors.length > 0 ? colors[0] : "Lilac"
                )
              }}
            >
              {keycapColors.map((color) => (
                <ToggleGroup.Item
                  key={color.name}
                  value={color.name}
                  className="flex items-center justify-center rounded-full bg-muted/50 px-3 py-1 text-xs"
                >
                  <div
                    className={`w-4 h-4 rounded-full ${color.hex === "#B9A6E8" && "border-2 border-primary"} ${color.hex === "#F4C9DA" && "bg-primary-foreground"} ${color.hex === "#3B3744" && "bg-muted-foreground"} ${color.hex === "#F3EEE3" && "bg-primary-foreground"}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="hidden sm:inline capitalize-first">{color.name}</span>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </div>

          {/* Case material filter */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2">
              Case material
            </label>
            <ToggleGroup
              type="multiple"
              multiple
              className="grid grid-cols-2 gap-2 w-full"
              onValueChange={(vals) => {
                const mats = vals as string[]
                setSelectedCaseMaterial(mats[0] || "Aluminium")
              }}
            >
              {caseMaterials.map((mat) => (
                <ToggleGroup.Item
                  key={mat.name}
                  value={mat.name}
                  className={cn(
                    "flex items-center justify-center rounded-full bg-muted/50 px-3 py-1 text-xs",
                    mat.included && "text-primary"
                  )}
                >
                  <span>{mat.name}</span>
                  <span className="ml-2 text-xs opacity-50">{mat.delta}</span>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </div>
        </div>
      </section>

      {/* Keyboard grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }, (_, i) => ({
            id: `kb-${i + 1}`,
            layout: selectedLayout,
            caseColor: selectedKeycapColor === "Lilac" ? "#B9A6E8" : selectedKeycapColor === "Sakura" ? "#F4C9DA" : selectedKeycapColor === "Graphite" ? "#3B3744" : "#F3EEE3",
            keycapColor: selectedKeycapColor,
            name: `Keyboard ${i + 1}`,
          })).map((kb) => (
            <Link
              key={kb.id}
              to={`/customize/${kb.id}`}
              className="group rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden"
            >
              <KeyboardPreview
                layout={kb.layout as "65" | "75" | "100"}
                caseColor={kb.caseColor}
                keycapColor={kb.keycapColor}
                className="w-full"
              />
              <div className="p-3">
                <h3 className="font-display text-sm font-semibold text-primary capitalize-first">{kb.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {kb.layout} layout
                </p>
              </div>
            </Link>
          ))}
        </Grid>
      </section>
    </div>
  )
}