export default interface Token {
  refreshTokenId: string;
  applicationId: string;
  applicationName: string;
  deviceType: string;
  authTime: string;
  ip: string;
  location?: string;
  originalAuthTime?: Date;
}