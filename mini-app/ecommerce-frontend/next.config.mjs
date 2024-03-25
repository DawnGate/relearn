/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: '@svgr/webpack',
		})
		return config
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**.aliyuncs.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: '**.aliyuncs.com',
				port: '',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
