import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // 👈 disable double useEffect runs in dev
  images: {
    remotePatterns: [
      {
        protocol: 'http', // 또는 'https'
        hostname: 'tomhoon.my',
        port: '33000', // 포트 번호 명시
        pathname: '/**', // 어떤 경로든 허용 (예: '/uploads/**' 로 특정 폴더만 허용 가능)
      },
    ],
  },
};

export default nextConfig;
