/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
    // This is the default (also the `src` folder is supported out of the box)
    "./src/i18n",
);

const urlBase = process.env.NEXT_PUBLIC_API_PROXY_URL;
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  /**
   * if you need proxy, then try this
   */
  async rewrites() {
    return process.env.NEXT_PUBLIC_ENVIRONMENT === "local"
      ? [
          {
            source: "/api/:path*",
            destination: `${urlBase}/:path*`,
          },
        ]
      : [];
  },
};

module.exports = withNextIntl(nextConfig);
