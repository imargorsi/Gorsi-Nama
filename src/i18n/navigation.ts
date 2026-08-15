import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware Link/router/pathname — use these instead of next/link and
// next/navigation everywhere internal navigation happens, so links preserve
// the current locale. See doc/i18n.md.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
