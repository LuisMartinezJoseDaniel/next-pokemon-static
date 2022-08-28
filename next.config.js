/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // dominio de poke api
    domains: ['raw.githubusercontent.com'],
  },
};

module.exports = nextConfig
