import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // 👈 disable double useEffect runs in dev
};

export default nextConfig;
