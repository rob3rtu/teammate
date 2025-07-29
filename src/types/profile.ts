import { z } from "zod";
import { PlayerLevelEnum } from "./auth";

export const profileSchema = z.object({
  firstName: z.string().min(3, "First name must have at least 3 characters"),
  lastName: z.string().min(3, "First name must have at least 3 characters"),
  level: z.nativeEnum(PlayerLevelEnum),
  avatarUrl: z.string(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
