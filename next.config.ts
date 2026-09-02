import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.vogue.com.cn" },
      { protocol: "https", hostname: "www.vogue.com" },
      { protocol: "https", hostname: "www.vogue.co.uk" },
      { protocol: "https", hostname: "www.ellechina.com" },
      { protocol: "https", hostname: "www.elle.com" },
      { protocol: "https", hostname: "www.bazaar.com.cn" },
      { protocol: "https", hostname: "www.harpersbazaar.com" },
      { protocol: "https", hostname: "www.marieclaire.com.cn" },
      { protocol: "https", hostname: "www.cosmopolitan.com.cn" },
      { protocol: "https", hostname: "www.gq.com.cn" },
      { protocol: "https", hostname: "www.gq.com" },
      { protocol: "https", hostname: "www.esquire.com.cn" },
      { protocol: "https", hostname: "www.vivi.tv" },
      { protocol: "https", hostname: "ray-web.jp" },
      { protocol: "https", hostname: "cancam.jp" },
      { protocol: "https", hostname: "www.wmagazine.com" },
      { protocol: "https", hostname: "i-d.co" },
      { protocol: "https", hostname: "www.dazedkorea.com" },
      { protocol: "https", hostname: "www.dazeddigital.com" },
      { protocol: "https", hostname: "sns-webpic-qc.xhscdn.com" },
      { protocol: "https", hostname: "ci.xiaohongshu.com" },
      { protocol: "https", hostname: "ci.xiaohongshu.com" },
      { protocol: "https", hostname: "sns-avatar-qc.xhscdn.com" },
    ],
  },
};

export default nextConfig;