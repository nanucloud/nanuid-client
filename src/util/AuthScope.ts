import { AuthScope } from "../types/OAuth";

export const parseAuthScope = (scopeStr: string): number => {
  const scopes = scopeStr
    .replace(/[\[\]']/g, "")
    .split(",")
    .map((s) => s.trim());
  let result = 0;

  scopes.forEach((scope) => {
    switch (scope.toLowerCase()) {
      case "full":
        result |= AuthScope.FULL_ACCESS;
        break;
      case "name":
        result |= AuthScope.NAME_ACCESS;
        break;
      case "email":
        result |= AuthScope.EMAIL_ACCESS;
        break;
      case "userid":
        result |= AuthScope.USERID_ACCESS;
        break;
      case "birth":
        result |= AuthScope.BIRTH_ACCESS;
        break;
    }
  });

  return result;
};

export const getScopeNames = (scopeBits: number): string[] => {
  const scopes: string[] = [];

  if (scopeBits & AuthScope.FULL_ACCESS) scopes.push("전체 접근");
  if (scopeBits & AuthScope.NAME_ACCESS) scopes.push("이름");
  if (scopeBits & AuthScope.EMAIL_ACCESS) scopes.push("이메일");
  if (scopeBits & AuthScope.USERID_ACCESS) scopes.push("사용자 ID");
  if (scopeBits & AuthScope.BIRTH_ACCESS) scopes.push("생년월일");

  return scopes;
};
