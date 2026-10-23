import { useCallback, useEffect, useState } from "react"
import { z } from "zod"
import type { Layout } from "@/lib/catalog"

const CART_STORAGE_KEY = "revara-cart"
const LEGACY_CART_STORAGE_KEY = "triare-cart"
const CART_UPDATED_EVENT = "revara-cart-updated"

const CartItemSchema = z.object({
  id: z.string().min(1),
  layout: z.enum(["65", "75", "100"]),
  case: z.string().min(1),
  keycaps: z.string().min(1),
  switch: z.string().optional(),
  price: z.number().int().nonnegative(),
  caseColor: z.string().optional(),
  keycapColor: z.string().optional(),
})

const CartSchema = z.array(CartItemSchema)

export type CartItem = z.infer<typeof CartItemSchema>
export type NewCartItem = Omit<CartItem, "id">

function readCart(): CartItem[] {
  try {
    const source = localStorage.getItem(CART_STORAGE_KEY)
    const isLegacy = source === null
    const raw = source ?? localStorage.getItem(LEGACY_CART_STORAGE_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    const result = CartSchema.safeParse(parsed)
    if (!result.success) {
      console.error("Saved cart contains invalid items", result.error)
      return []
    }
    if (isLegacy) localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(result.data))
    return result.data
  } catch (error) {
    console.error("Could not load saved cart", error)
    return []
  }
}

function sameBuild(left: NewCartItem, right: CartItem): boolean {
  return left.layout === right.layout
    && left.case === right.case
    && left.keycaps === right.keycaps
    && left.switch === right.switch
    && left.caseColor === right.caseColor
    && left.keycapColor === right.keycapColor
    && left.price === right.price
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    const refreshCart = () => setItems(readCart())
    window.addEventListener("storage", refreshCart)
    window.addEventListener(CART_UPDATED_EVENT, refreshCart)
    return () => {
      window.removeEventListener("storage", refreshCart)
      window.removeEventListener(CART_UPDATED_EVENT, refreshCart)
    }
  }, [])

  const commit = useCallback((updated: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated))
      setItems(updated)
      window.dispatchEvent(new Event(CART_UPDATED_EVENT))
      return true
    } catch (error) {
      console.error("Could not save cart", error)
      return false
    }
  }, [])

  const addItem = useCallback((item: NewCartItem) => {
    if (items.some((existing) => sameBuild(item, existing))) return "duplicate" as const
    const added: CartItem = { ...item, id: crypto.randomUUID() }
    return commit([...items, added])
  }, [commit, items])

  const removeItem = useCallback((id: string) => {
    return commit(items.filter((item) => item.id !== id))
  }, [commit, items])

  return { items, addItem, removeItem }
}

export function isLayout(value: string | undefined): value is Layout {
  return value === "65" || value === "75" || value === "100"
}
