import { RevealOnScroll } from "./RevealOnScroll";

const groups = [
  ["Backend", ["Java", "Spring Framework", "Spring Boot", "REST APIs", "Microservices"]],
  ["Data & Messaging", ["SQL", "MySQL", "MongoDB", "Redis", "Apache Kafka"]],
  ["Cloud & Delivery", ["Docker", "Kubernetes", "GitLab CI/CD", "GitHub Actions", "Ansible", "Google Cloud", "Microsoft Azure"]],
  ["Languages & Frontend", ["JavaScript", "TypeScript", "Python", "Angular", "React", "Next.js"]]
];

export function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <RevealOnScroll><p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">03 / TOOLBOX</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Technical skills</h2></RevealOnScroll>
      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline sm:grid-cols-2">
        {groups.map(([title, skills], index) => <RevealOnScroll key={title as string} delay={index * 0.04}><div className="h-full bg-elevated p-6"><h3 className="font-mono text-xs uppercase tracking-wider text-fg-dim">{title as string}</h3><div className="mt-4 flex flex-wrap gap-2">{(skills as string[]).map((skill) => <span key={skill} className="rounded-md border border-hairline px-2.5 py-1.5 text-xs text-fg">{skill}</span>)}</div></div></RevealOnScroll>)}
      </div>
      <p className="mt-5 text-xs text-fg-dim">Professional experience is primarily Java/Spring, Angular, GitLab, Ansible and PL/SQL; other technologies reflect project and learning work.</p>
    </section>
  );
}
