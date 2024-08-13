/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: false,
  webpack(config, options) {

    config.module.rules.push(
        {
          test: /\.tsx$/i,
          use: ['cursor-pointer-loader'],
        }
    )

    return config
  },
};

export default nextConfig;
