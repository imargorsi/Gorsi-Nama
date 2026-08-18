import { NotFoundPanel } from "@/components/not-found-panel";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <PageBreadcrumb
          crumbs={[
            { label: "Home", href: "/" },
            { label: "404" },
          ]}
        />
        <NotFoundPanel
          heading="404 - Page Not Found"
          text="The page you are looking for does not exist."
        />
      </main>
    </>
  );
}
