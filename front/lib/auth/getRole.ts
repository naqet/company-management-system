import { JWTPayload, jwtVerify } from "jose";

const getRole = async (authCookie: string): Promise<JWTPayload> => {
  const token = authCookie.split(" ")?.[1];

  const { payload: data } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return data;
};

export default getRole;
