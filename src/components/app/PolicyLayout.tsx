import { POLICY_LAST_UPDATED } from "@/lib/policies"
import { PageContainer } from "@/components/app/PageContainer"

export interface PolicySection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface PolicyDocument {
  title: string
  summary: string
  sections: PolicySection[]
}

export function PolicyLayout({ policy }: { policy: PolicyDocument }) {
  const sections = policy.sections.map((section, index) => {
    const slug = section.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
    return { ...section, id: `policy-section-${slug}-${index + 1}` }
  })

  return (
    <PageContainer>
      <article className="w-full">
        <header className="mb-10 border-b border-border pb-7">
          <p className="mb-3 text-sm text-muted-foreground">Triare policies</p>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{policy.title}</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted-foreground">{policy.summary}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:items-start">
          <nav aria-label="On this page" className="lg:sticky lg:top-24">
            <h2 className="mb-3 text-sm font-semibold">On this page</h2>
            <ol className="space-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline" href={`#${section.id}`}>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-prose space-y-9">
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id} className="scroll-mt-24 font-display text-xl font-semibold">{section.title}</h2>
                {section.paragraphs?.map((paragraph, index) => (
                  <p key={`${section.id}-paragraph-${index}`} className="mt-3 leading-7 text-muted-foreground">{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
                    {section.bullets.map((bullet, index) => <li key={`${section.id}-bullet-${index}`}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>Last updated: {POLICY_LAST_UPDATED}</p>
        </footer>
      </article>
    </PageContainer>
  )
}
