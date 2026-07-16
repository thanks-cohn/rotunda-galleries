import type { NextConfig } from "next";

const deploymentTarget = process.env.DEPLOY_TARGET;
const isGitHubPages = deploymentTarget === "github-pages";
const isStaticExport =
  isGitHubPages || deploymentTarget === "cloudflare-pages";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      trailingSlash: true,
      ...(isGitHubPages ? { basePath: "/rotunda-galleries" } : {}),
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
