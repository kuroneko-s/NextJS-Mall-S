/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    KAKAO_REDIRECT_URL: process.env.KAKAO_REDIRECT_URL,
    KAKAO_API_KEY: process.env.KAKAO_API_KEY,
    KAKAO_ADMIN_KEY: process.env.KAKAO_ADMIN_KEY,

    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
    NAVER_REDIRECT_URL: process.env.NAVER_REDIRECT_URL,
  },
  compiler: {
    // styled-components SSR로인해 className이 unmatch되는 문제를 SWC로 해결하기 위해서 추가.
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
