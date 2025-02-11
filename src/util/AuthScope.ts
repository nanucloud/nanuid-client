import { AuthScope } from "../types/OAuth";

export const parseAuthScope = (scopeStr: string): number => {
  try {
    const cleanStr = scopeStr.replace(/[\[\]"'\s]/g, "");
    const scopes = cleanStr.split(",");
    let result = 0;

    scopes.forEach((scope) => {
      switch (scope.toUpperCase()) {
        case "FULL":
          result |= AuthScope.FULL_ACCESS;
          break;
        case "NAME":
          result |= AuthScope.NAME_ACCESS;
          break;
        case "EMAIL":
          result |= AuthScope.EMAIL_ACCESS;
          break;
        case "USERID":
          result |= AuthScope.USERID_ACCESS;
          break;
        case "BIRTH":
          result |= AuthScope.BIRTH_ACCESS;
          break;
      }
    });

    return result;
  } catch (error) {
    console.error("Error parsing auth scope:", error);
    return 0;
  }
};

export const getScopeList = (scopeBits: number): string[] => {
  const scopes: string[] = [];

  if (scopeBits & AuthScope.FULL_ACCESS) scopes.push("전체 접근");
  if (scopeBits & AuthScope.NAME_ACCESS) scopes.push("이름");
  if (scopeBits & AuthScope.EMAIL_ACCESS) scopes.push("이메일");
  if (scopeBits & AuthScope.USERID_ACCESS) scopes.push("사용자 ID");
  if (scopeBits & AuthScope.BIRTH_ACCESS) scopes.push("생년월일");

  return scopes;
};