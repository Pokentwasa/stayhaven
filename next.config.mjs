/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Stay Haven currently has a single property (Salt+Haven), which lives
    // on the homepage. These preserve any old multi-property/collection
    // links rather than 404ing.
    return [
      { source: "/stays", destination: "/", permanent: false },
      { source: "/stays/:slug", destination: "/", permanent: false },
      { source: "/destinations", destination: "/", permanent: false },
      { source: "/destinations/:slug", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
