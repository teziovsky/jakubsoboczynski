// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "custom",
    loaderFile: "./helpers/imageLoader.ts",
  },
};

module.exports = nextConfig;
