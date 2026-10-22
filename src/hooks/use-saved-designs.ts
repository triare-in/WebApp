import { useCallback, useState } from "react"
import { z } from "zod"
import type { Layout } from "@/lib/catalog"

const STORAGE_KEY = "revara-saved-designs"

const SavedDesignSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  layout: z.enum(["65", "75", "100"]),
  case: z.string().min(1),
  keycaps: z.string().min(1),
  switch: z.string().min(1),
  price: z.number().int().nonnegative(),
  caseColor: z.string(),
  keycapColor: z.string(),
  createdAt: z.string().datetime(),
})

const SavedDesignsSchema = z.array(SavedDesignSchema)
export type SavedDesign = z.infer<typeof SavedDesignSchema>

function readDesigns(): SavedDesign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const result = SavedDesignsSchema.safeParse(JSON.parse(raw))
    if (!result.success) {
      console.error("Saved designs contain invalid items", result.error)
      return []
    }
    return result.data
  } catch (error) {
    console.error("Could not load saved designs", error)
    return []
  }
}

export function useSavedDesigns() {
  const [designs, setDesigns] = useState<SavedDesign[]>(readDesigns)

  const saveDesign = useCallback((design: Omit<SavedDesign, "id" | "createdAt">) => {
    try {
      const next: SavedDesign = {
        ...design,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }
      const updated = [next, ...designs]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setDesigns(updated)
      return true
    } catch (error) {
      console.error("Could not save design", error)
      return false
    }
  }, [designs])

  const removeDesign = useCallback((id: string) => {
    try {
      const updated = designs.filter((design) => design.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setDesigns(updated)
      return true
    } catch (error) {
      console.error("Could not remove saved design", error)
      return false
    }
  }, [designs])

  return { designs, saveDesign, removeDesign }
}

export function isSavedLayout(value: string): value is Layout {
  return value === "65" || value === "75" || value === "100"
}
