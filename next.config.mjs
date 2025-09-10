/** @type {import('next').NextConfig} */


const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
   typescript: {
      // 在生产构建时忽略 TypeScript 错误
       ignoreBuildErrors: true,
    },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
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
