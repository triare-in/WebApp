import { useState, type DragEvent, type FormEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { AlertCircle, FileImage, Package, Upload, X } from "lucide-react"
import { toast } from "sonner"
import { Field } from "@/components/app/Field"
import { PageContainer } from "@/components/app/PageContainer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const claimableOrders = [
  { id: "RVR-0977", label: "RVR-0977 · 75% Lilac Aluminium · Delivered 28 Aug 2026" },
]

type ClaimPreference = "replacement-part" | "refund"

export function ClaimPage() {
  const [searchParams] = useSearchParams()
  const [orderId, setOrderId] = useState(() => {
    const requestedOrder = searchParams.get("order")
    return claimableOrders.some((order) => order.id === requestedOrder) ? requestedOrder ?? "" : ""
  })
  const [claimType, setClaimType] = useState("")
  const [severity, setSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [preference, setPreference] = useState<ClaimPreference>("replacement-part")
  const [files, setFiles] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)

  const addFiles = (incoming: FileList | File[]) => {
    const selected = Array.from(incoming)
    const acceptable = selected.filter((file) =>
      (file.type.startsWith("image/") || file.type.startsWith("video/")) && file.size <= 10 * 1024 * 1024
    )
    if (acceptable.length !== selected.length) {
      toast.error("Choose image or video files up to 10 MB each.")
    }
    setFiles((current) => {
      const unique = new Map(current.map((file) => [`${file.name}-${file.size}-${file.lastModified}`, file]))
      acceptable.forEach((file) => unique.set(`${file.name}-${file.size}-${file.lastModified}`, file))
      return [...unique.values()]
    })
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragOver(false)
    addFiles(event.dataTransfer.files)
  }

  const isFormValid = Boolean(orderId && claimType && severity && description.trim())

  const submitClaim = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isFormValid) return
    toast.info("Claim submission is not connected in this preview.")
  }

  return (
    <PageContainer>
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">Raise a claim</h1>
        <p className="mt-2 text-muted-foreground">Select a delivered order and tell us what went wrong.</p>
      </header>

      <form onSubmit={submitClaim} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="font-display">Order details</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field id="order" label="Order">
                <Select value={orderId} onValueChange={setOrderId}>
                  <SelectTrigger id="order" className="w-full">
                    <SelectValue placeholder="Select a delivered order" />
                  </SelectTrigger>
                  <SelectContent>
                    {claimableOrders.map((order) => (
                      <SelectItem key={order.id} value={order.id}>{order.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              {orderId ? (
                <div className="flex items-start gap-4 rounded-lg border border-border p-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Package className="size-6 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium">{claimableOrders.find((order) => order.id === orderId)?.label}</p>
                    <Badge variant="success" className="mt-2">Delivered</Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Only delivered orders are available for warranty claims.</p>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="claim-type" label="Claim type">
                  <Select value={claimType} onValueChange={setClaimType}>
                    <SelectTrigger id="claim-type" className="w-full">
                      <SelectValue placeholder="Select an issue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="switch-issue">Switch not working</SelectItem>
                      <SelectItem value="case-damage">Case damage</SelectItem>
                      <SelectItem value="keycap-stuck">Keycap stuck or missing</SelectItem>
                      <SelectItem value="battery-issue">Battery or wireless issue</SelectItem>
                      <SelectItem value="visual-defect">Visual defect</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field id="claim-severity" label="Severity">
                  <Select value={severity} onValueChange={setSeverity}>
                    <SelectTrigger id="claim-severity" className="w-full">
                      <SelectValue placeholder="How bad is it?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minor">Minor · Cosmetic</SelectItem>
                      <SelectItem value="moderate">Moderate · Affects use</SelectItem>
                      <SelectItem value="critical">Critical · Keyboard unusable</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Describe the issue</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              <Field id="description" label="What happened?">
                <Textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the issue in detail..."
                  className="min-h-32"
                  required
                />
              </Field>
              <Field id="proof" label="Photos or videos" hint="Images and videos up to 10 MB each.">
                <label
                  htmlFor="proof"
                  onDragOver={(event) => { event.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                >
                  <Input
                    id="proof"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="sr-only"
                    aria-describedby="proof-hint"
                    onChange={(event) => {
                      addFiles(event.currentTarget.files ?? [])
                      event.currentTarget.value = ""
                    }}
                  />
                  <Upload className="mb-3 size-8 text-muted-foreground" aria-hidden="true" />
                  <span className="font-medium">Drag files here or choose files</span>
                  <span className="mt-1 text-sm text-muted-foreground">PNG, JPG, GIF, MP4, MOV and other image or video formats</span>
                </label>
              </Field>
              {files.length > 0 && (
                <ul className="space-y-2" aria-label="Selected evidence files">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}-${file.lastModified}`} className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2">
                      <span className="flex min-w-0 items-center gap-2 text-sm">
                        <FileImage className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span className="truncate">{file.name}</span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="size-10 shrink-0"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                      >
                        <X className="size-4" aria-hidden="true" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">How would you like us to proceed?</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={preference}
                onValueChange={(value) => {
                  if (value === "replacement-part" || value === "refund") setPreference(value)
                }}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <Label
                  htmlFor="replacement-part"
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary"
                >
                  <RadioGroupItem id="replacement-part" value="replacement-part" className="mt-0.5" />
                  <span>
                    <span className="block font-medium">Replacement part (free, with proof)</span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">If approved, the part and shipping are free.</span>
                  </span>
                </Label>
                <Label
                  htmlFor="refund"
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary"
                >
                  <RadioGroupItem id="refund" value="refund" className="mt-0.5" />
                  <span>
                    <span className="block font-medium">Refund (return at your cost)</span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground">Refunds are considered for approved claims only.</span>
                  </span>
                </Label>
              </RadioGroup>
              <Button type="submit" className="w-full" disabled={!isFormValid}>Submit claim</Button>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <AlertCircle className="size-5" aria-hidden="true" />
                Warranty information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Coverage lasts 12 months from delivery for products marked as covered.</p>
              <p>Claims are reviewed based on the product, evidence, and warranty status.</p>
              <p>Read the <Link to="/policies/warranty" className="text-primary underline underline-offset-4">warranty policy</Link> and <Link to="/policies/returns" className="text-primary underline underline-offset-4">returns policy</Link>.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="font-display">Need help?</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Review the troubleshooting guidance or contact the team through the <Link to="/support" className="text-primary underline underline-offset-4">support page</Link>.
              </p>
            </CardContent>
          </Card>
        </aside>
      </form>
    </PageContainer>
  )
}
