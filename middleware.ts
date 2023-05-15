import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  console.info("middleware run");

  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "shop-user-info",
    password: process.env.IRON_PASSWORD!,
  });

  const { user } = session;

  // 로그인 유무 검증
  if (user?.role == undefined) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/notification", "/cart", "/library", "/profile"],
};
