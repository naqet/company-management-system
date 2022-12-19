import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const isAuthValid = async (req: NextRequest): Promise<boolean> => {
  try {
    const authCookie = req.cookies.get("Authentication");

    if (!authCookie) return false;

    const token = authCookie.value.split(" ")?.[1];

    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return true;
  } catch {
    return false;
  }
};

export default isAuthValid;
