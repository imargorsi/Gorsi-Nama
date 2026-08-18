import { SectionHeading } from "@/components/home/section-heading";
import { SectionLink } from "@/components/home/section-link";
import { Reveal } from "@/components/reveal";

export function CallToAction({
  eyebrow = "Contribute",
  title,
  text,
  buttonText,
  href,
}: {
  eyebrow?: string;
  title: string;
  text: string;
  buttonText: string;
  href: string;
}) {
  return (
    <section className="border-t border-gold/20">
      <div className="site-shell px-4 py-14 sm:px-0 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={text}
          >
            <SectionLink href={href}>{buttonText}</SectionLink>
          </SectionHeading>
        </Reveal>
      </div>
    </section>
  );
}
