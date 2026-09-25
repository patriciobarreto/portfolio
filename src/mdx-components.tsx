import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-16 text-2xl font-semibold tracking-tight text-ink first:mt-0 dark:text-paper"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mt-4 max-w-[65ch] text-base leading-relaxed text-ink/80 dark:text-paper/80"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink/80 dark:text-paper/80"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="underline decoration-brand-strong underline-offset-2 hover:text-brand-strong dark:decoration-brand dark:hover:text-brand"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-ink/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-paper/[.08]"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mt-4 overflow-x-auto rounded-lg bg-ink/[.06] p-4 font-mono text-sm dark:bg-paper/[.08]"
        {...props}
      />
    ),
    ...components,
  };
}
