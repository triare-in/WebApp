
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
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">Products</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                <KeyboardPreview layout={product.layout} caseColor={product.caseColor} keycapColor={product.keycapColor} className="w-32 h-24" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge variant={product.active ? "success" : "secondary"}>{product.active ? "Active" : "Inactive"}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">SKU: {product.id} · {product.layout}% layout</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-medium tabular-nums">{formatPrice(product.price)}</p>
                  <p className={`text-xs ${product.stock === 0 ? "text-destructive" : "text-muted-foreground"}`}>{product.stock} in stock</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}