import Image from "next/image";

export function Banner() {
  return (
    <section className="relative isolate overflow-hidden py-20">
      <Image src="/hero.jpg" alt="" fill className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-espresso/70" />

      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-heading text-2xl font-semibold text-ivory sm:text-3xl">
          Preserving Our Heritage &amp; Culture:
          <br />
          Celebrating the Gorsi Legacy
        </h2>
      </div>
    </section>
  );
}
