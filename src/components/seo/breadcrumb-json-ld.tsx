import { generateBreadcrumbJsonLd } from "@/lib/structured-data";

export function BreadcrumbJsonLd({ path, locale }: { path: string; locale: string }) {
  const breadcrumb = generateBreadcrumbJsonLd(path, locale);
  if (!breadcrumb) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
    />
  );
}
