import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "section"
  py?: "default" | "none"
}

export function PageContainer({
  as: Container = "div",
  className,
  py = "default",
  ...props
}: PageContainerProps) {
  return (
    <Container
      className={cn(
        "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
        py === "default" && "py-10",
        className,
      )}
      {...props}
    />
  )
}
