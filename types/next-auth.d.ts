import type { UserPlan, UserRole } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      plan: UserPlan;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    plan: UserPlan;
  }
}

