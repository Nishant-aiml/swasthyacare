/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com;
              style-src 'self' 'unsafe-inline' https://*.googleapis.com;
              img-src 'self' data: https://*.googleapis.com https://*.gstatic.com;
              font-src 'self' https://*.gstatic.com;
              connect-src 'self' https://*.googleapis.com https://generativelanguage.googleapis.com wss://api.swasthyacare.com https://api.mapbox.com https://api.yourdomain.com;
              frame-src 'self';
              object-src 'none';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['cdnjs.cloudflare.com'],
  },
  // Optimize for mobile
  experimental: {
    optimizeFonts: true,
    optimizeImages: true,
  },
};

module.exports = withPWA(nextConfig);
