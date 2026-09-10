import Image from "next/image";
import resumeData from "@/data/resume.json";
import { RevealOnScroll } from "./RevealOnScroll";

const companyLinks: Record<string, string> = {
  "Tata Consultancy Services": "https://www.tcs.com/",
  "Quantiphi Analytics Pvt. Ltd.": "https://quantiphi.com/",
};

const companies = [
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    lightLogo: "/companies/tcs-black.png",
    darkLogo: "/companies/tcs-white.png",
    width: 280,
    height: 100,
  },
  {
    id: "quantiphi",
    name: "Quantiphi Analytics Pvt. Ltd.",
    lightLogo: "/companies/quantiphi-dark.svg",
    darkLogo: "/companies/quantiphi-light.png",
    width: 300,
    height: 120,
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="border-y border-hairline bg-elevated/30"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="01 / EXPERIENCE" title="Experience" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {companies.map((company, index) => {
            // Only render companies that exist in resume.json
            const exists = resumeData.experience.some(
              (job) => job.company === company.name
            );

            if (!exists) return null;

            return (
              <RevealOnScroll key={company.id} delay={index * 0.06}>
                <a
                  href={companyLinks[company.name]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${company.name}`}
                  className="
                    group
                    flex
                    h-72
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-hairline
                    bg-bg
                    px-10
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-accent/50
                  "
                >
                  {/* Light mode */}
                  <Image
                    src={company.lightLogo}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    priority
                    className="
                      block
                      h-auto
                      max-h-32
                      w-auto
                      max-w-[280px]
                      object-contain
                      opacity-90
                      transition-transform
                      duration-300
                      group-hover:scale-105
                      group-hover:opacity-100
                      dark:hidden
                    "
                  />

                  {/* Dark mode */}
                  <Image
                    src={company.darkLogo}
                    alt={company.name}
                    width={company.width}
                    height={company.height}
                    priority
                    className="
                      hidden
                      h-auto
                      max-h-32
                      w-auto
                      max-w-[300px]
                      object-contain
                      opacity-95
                      transition-transform
                      duration-300
                      group-hover:scale-105
                      group-hover:opacity-100
                      dark:block
                    "
                  />
                </a>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <RevealOnScroll>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-accent">
        {eyebrow}
      </p>

      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </RevealOnScroll>
  );
}