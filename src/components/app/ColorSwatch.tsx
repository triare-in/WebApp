import { Check } from "lucide-react"
import { RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface ColorSwatchProps {
  id: string
  value: string
  name: string
  color: string
  selected: boolean
}

export function ColorSwatch({ id, value, name, color, selected }: ColorSwatchProps) {
  return (
    <div
      className={cn(
        "flex min-h-11 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm",
        "has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary",
      )}
    >
      <RadioGroupItem id={id} value={value} aria-label={`${name} colorway`} />
      <span className="size-5 shrink-0 rounded-full border border-border" style={{ backgroundColor: color }} aria-hidden="true" />
      <span className="flex-1">{name}</span>
      {selected && <Check className="size-4 text-primary" aria-hidden="true" />}
    </div>
  )
}
