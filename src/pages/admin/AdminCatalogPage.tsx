
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Search, Plus, Edit } from "lucide-react"
import { formatPrice, getPresetPrice, KEYBOARD_PRESETS } from "@/lib/catalog"

const products = KEYBOARD_PRESETS.map((preset, index) => ({
  ...preset,
  id: `P00${index + 1}`,
  price: getPresetPrice(preset.layout, preset.case),
  stock: [12, 8, 5][index] ?? 0,
  active: true,
}))

export function AdminCatalogPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Catalog</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="font-display">Products</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
              <Input aria-label="Search products" placeholder="Search products..." className="w-full pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex min-w-0 flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
                <KeyboardPreview layout={product.layout} caseColor={product.caseColor} keycapColor={product.keycapColor} className="w-full max-w-60 self-center sm:w-32 sm:self-auto" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge variant={product.active ? "success" : "secondary"}>{product.active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">SKU: {product.id} · {product.layout}% layout</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:mr-4 sm:block sm:text-right">
                  <p className="font-medium tabular-nums">{formatPrice(product.price)}</p>
                  <p className={`text-xs ${product.stock === 0 ? "text-destructive" : "text-muted-foreground"}`}>{product.stock} in stock</p>
                </div>
                <Button variant="ghost" size="icon" aria-label={`Edit ${product.name}`}>
                  <Edit className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}