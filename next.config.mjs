import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // A stray lockfile in a parent folder makes Next guess the wrong workspace
  // root, which would drag unrelated directories into the deploy trace.
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),

  images: {
    // The room photographs are wide; these are the widths actually requested
    // by the layout, so Next does not generate sizes nothing asks for.
    deviceSizes: [390, 640, 828, 1080, 1440, 1920, 2400],
    formats: ['image/webp'],
    // Next 16 requires every quality used in the app to be declared here.
    qualities: [82],
  },
};

export default nextConfig;
