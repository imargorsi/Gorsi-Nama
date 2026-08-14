export function PageBreadcrumb({ title }: { title: string }) {
  return (
    <div className="border-b bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Home / {title}</p>
      </div>
    </div>
  );
}
