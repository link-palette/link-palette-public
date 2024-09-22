export const DEFAULT_PAGE_AFTER_LOGIN = "/profile";

interface IDefaultProviderName {
  [key: string]: string;
}

export const DEFAULT_PROVIDER_NAME: IDefaultProviderName = {
  facebook: "페이스북",
  instagram: "인스타그램",
  twitter: "트위터",
  youtube: "유튜브",
  naver_blog: "네이버 블로그",
  kakao: "카카오",
}