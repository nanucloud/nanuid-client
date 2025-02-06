export interface Application {
  applicationId: string;
  ownerId: string;
  name: string;
  description: string;
  isPublic: boolean;
  applicationSecret: string;
}
