import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      name: string;
      role: "ADMIN" | "USER";
    };
  }
}

const cookieOptions = {
  cookieName: "shop-user-info",
  password: process.env.IRON_PASSWORD!, // complex_password_at_least_32_characters_long
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  //   cookieOptions: {
  //     secure: process.env.NODE_ENV === "production",
  //   },
};

export function withIronSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
