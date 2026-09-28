// outline-none is always paired with an explicit focus-visible outline
// below, never left bare — this only suppresses the browser default so our
// own (consistent across light/dark, and shaped to the rounded-full pill)
// is the one that shows. Tailwind v4 routes outline-style through the
// --tw-outline-style custom property rather than setting it directly, and
// outline-none sets that property to "none" — outline-2/-offset-2/-brand
// only touch width/offset/color, so without also resetting the property
// itself back, the ring stays invisible (width and color set, but nothing
// drawn). The bare `outline` utility is meant to do that reset but wasn't
// taking effect here, so it's set directly instead.
const FOCUS_RING =
  "outline-none focus-visible:[--tw-outline-style:solid] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

// Shared by every contact pill (Email, GitHub, LinkedIn, Resume) so they all
// sit at the exact same height and corner radius.
export const PILL_CLASS = `flex h-10 cursor-pointer items-center rounded-full border border-ink/15 px-4 text-ink transition-colors hover:border-brand hover:text-brand-strong dark:border-paper/20 dark:text-paper dark:hover:border-brand dark:hover:text-brand ${FOCUS_RING}`;

// The Email button is the primary action: filled instead of outlined, same
// height/radius/padding as PILL_CLASS so it lines up with the secondary
// pills next to it. #1F2429 is fixed regardless of theme (a specific brand
// choice, not the ink token), so a light-mode-only border is added in dark
// mode — the page background is that same color there, and without it the
// button would have no visible edge against it. The hover state is a
// specific lighter shade rather than an opacity step: in dark mode the page
// background is that same #1F2429, so blending any opacity of it over
// itself is a no-op — hovering would show no visible change at all.
export const PRIMARY_PILL_CLASS = `flex h-10 cursor-pointer items-center rounded-full bg-[#1F2429] px-4 text-paper transition-colors hover:bg-[#2E353C] dark:border dark:border-paper/20 ${FOCUS_RING}`;
