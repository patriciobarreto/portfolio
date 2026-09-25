import { Section } from "./Section";

const roles = [
  { company: "Soundboard", title: "Founding Engineer", period: "Jul 2023 - Present" },
  { company: "NTT DATA", title: "Software Engineering Co-op", period: "Jan 2022 - Jul 2022" },
  { company: "Everis", title: "Software Engineering Co-op", period: "Apr 2021 - Aug 2021" },
  {
    company: "Northeastern",
    title: "B.S., Computer Engineering and Computer Science, Minor in Mathematics",
    period: "2018 - 2023",
  },
];

export function Experience() {
  return (
    <Section id="experience" className="border-t border-ink/10 dark:border-paper/10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl dark:text-paper">
        Experience
      </h2>
      <ul className="mt-6 divide-y divide-ink/10 dark:divide-paper/10">
        {roles.map((role) => (
          <li key={role.company} className="flex flex-wrap items-baseline justify-between gap-x-4 py-4">
            <span className="font-medium text-ink dark:text-paper">
              {role.company} · {role.title}
            </span>
            <span className="text-sm text-ink/60 dark:text-paper/60">{role.period}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
