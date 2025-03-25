import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const origin = process.env.NEXT_PUBLIC_API_URL ?? "*";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "img.freepik.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	async headers() {
		return [
			{
				source: "/:path",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: origin,
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"Content-Type, Authorization, X-Requested-With, X-CSRF-Token",
					},
				],
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
