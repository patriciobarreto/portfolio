import { Section } from "./Section";

export function WorkingWithoutPM() {
  return (
    <Section id="working-without-a-pm" className="border-t border-ink/10 dark:border-paper/10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl dark:text-paper">
        Working without a PM
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        I ran weekly calls with the bookkeepers and tax preparers using the platform to surface
        pain points directly, evaluated what they raised against platform priorities, and owned
        the resulting feature decisions end to end. No PM layer in between.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        When I demoed the bookkeeping AI agent to non-technical users, I got two kinds of
        feedback. One was a suggestion on the RAG retrieval approach that I had already tested
        and ruled out, so I explained the tradeoff with data and held my ground. The other was a
        UX insight I hadn&apos;t considered, and I implemented it immediately, because the people
        using the tool every day see things I don&apos;t. Knowing when to push back with evidence
        and when to defer to the people closest to the problem is something I take seriously.
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70 dark:text-paper/70">
        After shipping the first version of transaction categorization, it worked (about 90%
        accuracy, live in production), but I could see the ceiling: slow, costly, built on
        abstractions I couldn&apos;t control. No one asked me to revisit it. When I brought the
        idea to rebuild it to my manager, the pushback was fair: it already works, why spend time
        on this? Instead of just arguing for it, I explained where the bottlenecks were and built
        a small proof of concept to show the performance gap. Seeing the difference shifted the
        conversation from whether to do it to when. After the rebuild shipped, it changed how my
        manager thought about investing in foundational systems even when something already
        works.
      </p>
      <ul className="mt-4 max-w-2xl space-y-1 text-base text-ink/70 dark:text-paper/70">
        <li>
          Integrated the QuickBooks API, including undocumented endpoints I had to find myself
          after QuickBooks&apos; own support team said it wasn&apos;t possible.
        </li>
        <li>
          Integrated Stripe to handle payments between users, learning the integration
          independently under real time pressure with no team to escalate to.
        </li>
        <li>
          Built a live S-Corp election calculator where every input immediately recalculates
          outputs across a comparison table.
        </li>
      </ul>
    </Section>
  );
}
