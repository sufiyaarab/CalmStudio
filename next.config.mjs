/** @type {import('next').NextConfig} */
const repo = "calmstudiobeta"; // e.g. "calmstudio-beta"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;