import { Link } from "@/i18n/navigation";

export function PageBreadcrumb({ title }: { title: string }) {
  return (
    <div className="border-b border-gold/20">
      <div className="site-shell px-4 py-10 sm:px-0 sm:py-12">
        <p className="text-sm text-warm-gray">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <span className="mx-2 text-gold/50">/</span>
          <span className="text-espresso">{title}</span>
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-espresso sm:text-4xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
