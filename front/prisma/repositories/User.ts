import { User } from "@prisma/client";
import db from "../../lib/prismadb";
import CreateUserPayload from "../../types/CreateUserPayload";

export const getUserByEmail = async (email: string) => {
  return db.user.findFirst({ where: { email } });
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  return db.user.create({
    data: {
      email: payload.email,
      name: payload.name,
      passwordHash: payload.passwordHash,
    },
  });
};
