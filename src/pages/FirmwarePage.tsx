
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Keyboard, ChevronRight } from "lucide-react"

export function FirmwarePage() {
  return (
      <div className="flex flex-col bg-background font-body">

        <div className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="h-16 border-b flex items-center justify-between">
              <h1 className="font-display text-xl font-semibold">Firmware</h1>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">Back to store</Link>
              </Button>
            </div>

            <div className="space-y-8 pt-6">
                <div className="space-y-8">
                  {/* Getting Started */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Getting started</h2>
                      <p className="text-muted-foreground">
                        Your keyboard ships with a working default keymap per layout. No setup required.
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/customize">Configure your keyboard</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* ZMK Studio */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-4">ZMK Studio (recommended)</h2>
                      <p className="text-muted-foreground mb-4">
                        Edit keys live in a browser or desktop app without reflashing. Needs a Studio-enabled build, an unlock key in the keymap and physical-layout metadata for each layout.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="rounded-lg bg-muted p-4">
                          <h3 className="font-display font-semibold mb-2">Pros</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>Live editing without reflashing</li>
                            <li>Browser-based</li>
                            <li>Works across layouts</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                          <h3 className="font-display font-semibold mb-2">Cons</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>Requires Studio-enabled build</li>
                            <li>Needs unlock key</li>
                          </ul>
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" asChild>
                        <a href="https://zmk.studio" target="_blank" rel="noreferrer">
                          Open ZMK Studio
                        </a>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* GitHub config */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-4">GitHub config template</h2>
                      <p className="text-muted-foreground mb-4">
                        Advanced: fork a template repo, edit the .keymap text file, let GitHub Actions build a .uf2, flash by double-tapping reset.
                      </p>
                      <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                        <li>Fork a keymap template repo</li>
                        <li>Edit the .keymap text file</li>
                        <li>Let GitHub Actions build a .uf2</li>
                        <li>Flash by double-tapping reset</li>
                      </ol>
                    </CardContent>
                  </Card>

                  {/* Layers and remap */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Layers & remapping</h2>
                      <p className="text-muted-foreground mb-4">
                        Keymaps use ZMK's devicetree-based .keymap format. Live editing is available only on builds configured for ZMK Studio; other changes need a firmware build and flash.
                      </p>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Keyboard className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          ZMK supports multiple layers per key. Each layer can have different keycodes.
                        </TooltipContent>
                      </Tooltip>
                    </CardContent>
                  </Card>

                  {/* Firmware updates */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Firmware updates</h2>
                      <p className="text-muted-foreground mb-4">
                        Firmware updates over USB-C. Connect your keyboard and use the configurator to update.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-muted p-4">
                          <h3 className="font-display font-semibold mb-2">Supported</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>OTA updates via ZMK web flasher</li>
                            <li>Double-tap reset to enter bootloader</li>
                          </ul>
                        </div>
                        <div className="rounded-lg bg-muted p-4">
                          <h3 className="font-display font-semibold mb-2">Precautions</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>Do not unplug during update</li>
                            <li>Keep battery above 20%</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* FAQ */}
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="font-display text-2xl font-bold tracking-tight mb-4">Frequently asked</h2>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="1">
                          <AccordionTrigger>
                            <span className="flex items-center justify-between">
                              <span>Do I need to reflash to change keys?</span>
                              <ChevronRight className="h-4 w-4" />
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2">
                            <p className="text-muted-foreground">
                              No! With ZMK Studio you can edit live, or use the GitHub config template.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="2">
                          <AccordionTrigger>
                            <span className="flex items-center justify-between">
                              <span>What if I brick my keyboard?</span>
                              <ChevronRight className="h-4 w-4" />
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2">
                            <p className="text-muted-foreground">
                              Most ZMK boards have a safe mode. Double-tap reset usually recovers them.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
            </div>
          </div>
        </div>

      </div>
  )
}