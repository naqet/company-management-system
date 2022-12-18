import { User } from "@prisma/client";

type CreateUserPayload = Pick<User, "email" | "name" | "passwordHash">;

export default CreateUserPayload;
