/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: false,
  experimental: {
    turbo: {
      rules: {
        '/\.tsx$/i': {
          loaders: ['cursor-pointer-loader']
        }
      }
    },
  },
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
