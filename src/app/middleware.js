import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*", // Применяем к API-роутам
};
