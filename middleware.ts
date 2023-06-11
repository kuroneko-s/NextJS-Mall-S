import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  console.info("middleware run");
  const reqPathName = req.nextUrl.pathname;

  // return new Response("rwqrqrwq", {status: 403});

  // 로그인 유무 검증
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!,
  });

  const { user } = session;

  if (user?.role === undefined || user.role === null) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // TODO : query로 접근 불가 메시지 띄워줄까 ?
  if (reqPathName.startsWith("/admin") && user.role === "USER") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/notification", "/cart", "/library", "/profile"],
};
