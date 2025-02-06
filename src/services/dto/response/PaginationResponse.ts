import Token from "../../../types/Token";

export interface PaginationResponse {
  content: Token[];        // 실제 데이터 배열
  totalPages: number;      // 총 페이지 수
  totalElements: number;   // 총 항목 수
  pageNumber: number;      // 현재 페이지 번호
  pageSize: number;        // 페이지 크기
}
