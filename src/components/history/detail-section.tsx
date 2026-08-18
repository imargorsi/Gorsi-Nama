import { HeritageRule } from "@/components/heritage-ornaments";
import { Reveal } from "@/components/reveal";

export function DetailSection() {
  return (
    <section className="border-t border-gold/20 bg-espresso/[0.04]">
      <div className="site-shell px-4 py-16 sm:px-0 sm:py-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col gap-10">
          <div>
            <p className="heritage-eyebrow">Medieval to settlement</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
              Gorsi Gujjars in Medieval History (12th-18th Century)
            </h2>
            <HeritageRule className="mt-4" />
            <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
              During the medieval period, the Gujjars, including the Gorsi
              clan, were known for their martial prowess. They played a
              significant role in the socio-political landscape of the Indian
              subcontinent. Often described as fierce and independent, Gujjars
              actively resisted external invaders, including during the Mughal
              era. Their reputation as warriors helped establish the Gujjars,
              including the Gorsi, as a prominent group in regional conflicts.
            </p>
          </div>

          <div>
            <p className="heritage-eyebrow">Kotha Gujjran</p>
            <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-espresso sm:text-3xl">
              Settlement in Kotha Gujjran (18th Century)
            </h2>
            <HeritageRule className="mt-4" />
            <p className="mt-4 text-sm leading-relaxed text-warm-gray sm:text-base">
              By the 1700s, the Gorsi clan had settled in Kotha Gujjran, a
              village in Punjab, Pakistan. Oral traditions suggest that the
              Gorsi originally lived in the forests before establishing this
              permanent settlement. For the past 300 years, Kotha Gujjran has
              been home to the Gorsi sub-tribe, where they have maintained
              their cultural identity and traditional way of life.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
