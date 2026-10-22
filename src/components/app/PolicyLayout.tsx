import { Link } from "react-router-dom"

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
  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 border-b border-border pb-7">
        <p className="mb-3 text-sm text-muted-foreground">Revara policies · Effective date to be confirmed before launch</p>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{policy.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{policy.summary}</p>
      </header>

      <div className="space-y-9">
        {policy.sections.map((section) => (
          <section key={section.title} className="max-w-3xl">
            <h2 className="font-display text-xl font-semibold">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-7 text-muted-foreground">{paragraph}</p>
            ))}
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-muted-foreground">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </section>
        ))}
      </div>

      <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
        This preview policy is based on <Link className="text-primary underline underline-offset-4" to="/support">Revara's policy templates</Link>.
        Business contact details and final legal wording must be completed and reviewed before the store launches.
      </footer>
    </article>
  )
}
