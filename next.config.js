/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: false,
  swcMinify: true,

  i18n: {
    locales: ['en', 'id'],
    defaultLocale: 'en',
  },

  // Uncoment to add domain whitelist
  images: {
    // Temporary
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/api/**',
      },
      {
        protocol: 'http',
        hostname: '52.74.21.105',
        port: '',
        pathname: '**',
      },
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    config.devServer = {
      client: {
        overlay: false,
      },
    };

    return config;
  },
};

module.exports = nextConfig