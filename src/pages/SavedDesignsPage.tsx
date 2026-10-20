"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Trash2, Edit, Copy, Heart } from "lucide-react"

const savedDesigns = [
  { id: "1", name: "Lilac Dream", layout: "75", caseColor: "#B9A6E8", keycapColor: "#F3EEE3", updated: "2 days ago" },
  { id: "2", name: "Sakura Breeze", layout: "65", caseColor: "#F4C9DA", keycapColor: "#F3EEE3", updated: "1 week ago" },
  { id: "3", name: "Ivory Classic", layout: "100", caseColor: "#F3EEE3", keycapColor: "#B9A6E8", updated: "2 weeks ago" },
  { id: "4", name: "Midnight", layout: "75", caseColor: "#1E1B2E", keycapColor: "#2A2233", updated: "1 month ago" },
]

export function SavedDesignsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">

      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">Saved designs</h1>
              <p className="text-muted-foreground text-sm mt-1">Your custom keyboard configurations</p>
            </div>
            <Button asChild>
              <Link to="/customize">Create new</Link>
            </Button>
          </div>

          {savedDesigns.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <Heart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-display text-lg font-semibold mb-2">No saved designs yet</h3>
                <p className="text-muted-foreground mb-6">Start customizing to save your first design</p>
                <Button asChild>
                  <Link to="/customize">Start customizing</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedDesigns.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:bg-accent/50 transition-colors">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <KeyboardPreview
                        layout={design.layout as "65" | "75" | "100"}
                        caseColor={design.caseColor}
                        keycapColor={design.keycapColor}
                        className="w-full h-full"
                      />
                      <div className="absolute right-2 top-2 flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80" aria-label="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80" aria-label="Copy">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-background/80 text-destructive hover:text-destructive" aria-label="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-medium">{design.name}</h3>
                        <span className="text-xs text-muted-foreground">{design.updated}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 capitalize">{design.layout} layout</p>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/customize/${design.layout}?design=${design.id}`}>Continue</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/customize/${design.layout}?duplicate=${design.id}`}>Duplicate</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

    </div>
  )
}