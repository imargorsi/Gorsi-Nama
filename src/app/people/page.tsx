import type { Metadata } from "next";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { CallToAction } from "@/components/call-to-action";
import { PersonalityCard } from "@/components/people/personality-card";

export const metadata: Metadata = {
  title: "Famous Gorsi Personalities | Gorsi Nama",
};

// Placeholder data — there's no notable-people API endpoint yet.
// See doc/product-overview.md.
export default function PeoplePage() {
  return (
    <>
      <PageBreadcrumb title="Famous Gorsi Personalities" />

      <PersonalityCard
        name="CH Rehman Ali"
        bio="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet facilis doloribus nam id voluptatum numquam ullam iusto incidunt quidem delectus recusandae culpa aspernatur fugiat quae, earum quisquam minima debitis? Minus."
      />

      <CallToAction
        text="This website is still under development, and we are doing our best to add all the notable Gorsi personalities from around the world. In the meantime, if you know of any individuals worth adding, please submit their details using the form below."
        buttonText="Submit Form"
      />
    </>
  );
}
