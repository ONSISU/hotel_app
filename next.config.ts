import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // 👈 disable double useEffect runs in dev
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
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*', // ⬅️ 프론트엔드에서 호출할 가상의 API 경로 (예: /api-proxy/v1/hotel/popular)
        destination: `http://211.108.197.157:33000/:path*`, // ⬅️ 실제 백엔드 API 서버 주소
                                                            // 'http://' 프로토콜을 반드시 포함해야 합니다!
      },
    ];
  },
};

export default nextConfig;
