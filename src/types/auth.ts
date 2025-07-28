export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  level: PlayerLevelEnum;
  setup: boolean;
}

export enum PlayerLevelEnum {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
}
