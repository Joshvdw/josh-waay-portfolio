/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compress: true,
  async headers() {
    return [
      {
        source: "/Assets/Laptop/Build/:path*\\.gz",
        locale: false,
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
          {
            key: "Content-Type",
            value: "application/gzip",
          },
          {
            key: "Content-Disposition",
            value: "attachment",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
