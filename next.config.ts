import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

function r2RemotePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    { protocol: "https", hostname: "*.r2.dev", pathname: "/**" },
  ];

  const publicUrl =
    process.env.R2_PUBLIC_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim();
  if (!publicUrl) return patterns;

  try {
    const parsed = new URL(publicUrl);
    patterns.push({
      protocol: parsed.protocol === "http:" ? "http" : "https",
      hostname: parsed.hostname,
      pathname: "/**",
    });
  } catch {
    // Local builds without a valid public URL still compile.
  }

  return patterns;
}

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: r2RemotePatterns(),
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon.png",
        permanent: false,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gorsinama.online" }],
        destination: "https://gorsinama.online/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "community.argorsi.com" }],
        destination: "https://gorsinama.online/:path*",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
