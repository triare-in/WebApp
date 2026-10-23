import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { PageContainer } from "@/components/app/PageContainer"

export function FirmwarePage() {
  return (
    <PageContainer className="space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Firmware</h1>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Getting started</h2>
          <p className="mb-4 text-muted-foreground">
            Your keyboard ships with a working default keymap for its layout. No setup is required to start typing.
          </p>
          <Button variant="outline" asChild>
            <Link to="/customize">Configure your keyboard</Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">ZMK Studio</h2>
          <p className="mb-4 text-muted-foreground">
            On Studio-enabled builds, edit keys in a browser or desktop app without reflashing. These builds need an unlock key in the keymap and physical-layout metadata for each layout.
          </p>
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-display font-semibold">What it does</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Edit keys live without reflashing</li>
                <li>Use it in a browser</li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="mb-2 font-display font-semibold">Build requirements</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Studio-enabled firmware build</li>
                <li>Unlock key and layout metadata</li>
              </ul>
            </div>
          </div>
          <Button variant="secondary" asChild>
            <a href="https://zmk.studio" target="_blank" rel="noreferrer">Open ZMK Studio</a>
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">GitHub keymap template</h2>
          <p className="mb-4 text-muted-foreground">
            For an advanced workflow, edit the `.keymap` text file in the template repository and use its GitHub Actions workflow to build a `.uf2` file.
          </p>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Fork the keymap template repository.</li>
            <li>Edit the `.keymap` file.</li>
            <li>Build the `.uf2` file with the repository workflow.</li>
            <li>Install it using the USB steps below.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Layers and remapping</h2>
          <p className="text-muted-foreground">
            ZMK keymaps can use multiple layers, with different keycodes on each layer. Studio-enabled builds can edit keys live; other changes require a firmware build and flash.
          </p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Firmware updates</h2>
          <p className="mb-4 text-muted-foreground">Install a firmware build over USB:</p>
          <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Connect the keyboard to your computer with a USB cable.</li>
            <li>Double-tap reset to open the keyboard drive.</li>
            <li>Drag the `.uf2` file onto the drive.</li>
          </ol>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Pairing multiple devices</h2>
          <p className="text-muted-foreground">
            Wireless builds support multi-device pairing. The key sequence and number of supported devices depend on the firmware build.
          </p>
          {/* TODO(launch): Verify pairing steps and device count for each production firmware build. */}
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Battery</h2>
          <p className="text-muted-foreground">
            Wireless builds include a user-replaceable battery. Capacity and runtime depend on the configured hardware and usage.
          </p>
          {/* TODO(launch): Confirm battery capacity and runtime for each production configuration. */}
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardContent className="px-6">
          <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="change-keys">
              <AccordionTrigger>Do I need to reflash to change keys?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Studio-enabled builds can edit keys live. Other keymap changes need a firmware build and flash.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="recovery">
              <AccordionTrigger>How do I recover a keyboard after a failed update?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Recovery steps depend on the firmware build. Contact support for guidance until the verified steps are published.
                </p>
                {/* TODO(launch): Confirm and publish recovery instructions for production builds. */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
