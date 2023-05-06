const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "custom",
    loaderFile: "./helpers/loader.ts",
  },
};

module.exports = nextConfig;
