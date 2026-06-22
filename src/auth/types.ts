import { User } from "src/generated/prisma/client";

export type LoginRequest = Pick<User, 'email' | 'password'>;
export type RegisterRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;