import { NotFoundPanel } from "@/components/not-found-panel";
import { PageBreadcrumb, pageBanner } from "@/components/page-breadcrumb";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageBreadcrumb
          image={pageBanner.history}
          eyebrow="Gorsi Nama"
          title="Page not found"
          crumbs={[
            { label: "Home", href: "/" },
            { label: "404" },
          ]}
          description="This path is not part of the archive."
        />
        <NotFoundPanel
          heading="404 - Page Not Found"
          text="The page you are looking for does not exist."
        />
      </main>
    </>
  );
}
