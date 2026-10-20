"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MessageSquare } from "lucide-react"

const reviews = [
  { id: 1, customer: "John Doe", orderId: "RVR-1042", rating: 5, comment: "Amazing build quality! Love the repairability.", date: "10 Oct 2026", approved: true },
  { id: 2, customer: "Priya S.", orderId: "RVR-1041", rating: 4, comment: "Great keyboard, shipping took a bit longer than expected.", date: "09 Oct 2026", approved: false },
  { id: 3, customer: "Amit K.", orderId: "RVR-1040", rating: 5, comment: "Perfect for my setup. Setup was easy!", date: "08 Oct 2026", approved: true },
]

export function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Reviews</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Customer reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium">{review.customer}</p>
                    <p className="text-sm text-muted-foreground">Order {review.orderId} · {review.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                    <Badge variant={review.approved ? "success" : "secondary"}>{review.approved ? "Approved" : "Pending"}</Badge>
                  </div>
                </div>
                <p className="text-sm mb-3">"{review.comment}"</p>
                <div className="flex gap-2">
                  {!review.approved && (
                    <>
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </>
                  )}
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}