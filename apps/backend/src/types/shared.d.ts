declare module "@enterprise-monorepo/shared" {
  export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest",
  }

  // Add other exported types as needed from the shared package
  export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
}
