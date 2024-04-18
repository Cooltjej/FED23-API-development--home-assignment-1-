//user types. create, update, userId

import { User } from "@prisma/client";          // user modellen

export type CreateUser = Omit<User, "id">;      // create- user minus id
export type UpdateUser = Partial<CreateUser>;   // update- user egenskaperna blir optional, inget id