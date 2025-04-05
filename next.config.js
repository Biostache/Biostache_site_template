/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "biostache.com",
            port: "",
            pathname: "/wp-content/uploads/**",
          },
        ],
      },
};

module.exports = nextConfig
