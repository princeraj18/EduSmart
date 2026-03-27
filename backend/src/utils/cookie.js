export const cookieOptions = {
    httpOnly: true,
    secure: false,      // true in production (HTTPS)
    sameSite: "lax",
    path: "/"           // ✅ VERY IMPORTANT
  }