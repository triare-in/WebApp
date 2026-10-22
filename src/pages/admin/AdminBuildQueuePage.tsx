
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"

const queue = [
  { id: "RVR-1042", layout: "75", caseColor: "#B9A6E8", keycapColor: "#F3EEE3", customer: "John Doe", started: "13 Oct", stage: "Switch soldering", priority: "Normal" },
  { id: "RVR-1038", layout: "100", caseColor: "#F3EEE3", keycapColor: "#B9A6E8", customer: "Rahul P.", started: "12 Oct", stage: "PCB assembly", priority: "Urgent" },
  { id: "RVR-1045", layout: "65", caseColor: "#F4C9DA", keycapColor: "#F3EEE3", customer: "Priya S.", started: "12 Oct", stage: "Case assembly", priority: "Normal" },
  { id: "RVR-1048", layout: "75", caseColor: "#1E1B2E", keycapColor: "#2A2233", customer: "Amit K.", started: "11 Oct", stage: "QC", priority: "High" },
]

export function AdminBuildQueuePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Build queue</h1>
        <Badge variant="warning">{queue.length} active builds</Badge>
      </div>

      <div className="grid gap-4">
        {queue.map((item) => (
          <Card key={item.id} className={item.priority === "Urgent" ? "border-warning/50" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <KeyboardPreview layout={item.layout as "65" | "75" | "100"} caseColor={item.caseColor} keycapColor={item.keycapColor} className="w-40 h-28" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-mono font-medium">{item.id}</h3>
                      <Badge variant={item.priority === "Urgent" ? "destructive" : item.priority === "High" ? "warning" : "secondary"}>{item.priority}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">Started {item.started}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Customer</p>
                      <p className="font-medium">{item.customer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stage</p>
                      <p className="font-medium">{item.stage}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Layout</p>
                      <p className="font-medium">{item.layout}%</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}