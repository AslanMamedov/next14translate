/** @type {import('next').NextConfig} */
const nextConfig = {
	// i18n: {
	// 	localeDetection: false,
	// }
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
};

module.exports = nextConfig;
