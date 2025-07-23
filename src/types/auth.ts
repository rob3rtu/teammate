export interface UserProfile {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  level: PlayerLevelEnum | null;
  setup: boolean;
}

export enum PlayerLevelEnum {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
}
