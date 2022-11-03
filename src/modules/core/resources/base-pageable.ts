export interface IBasePageable {
  totalPages: number;
  totalElements: number; // Total Record
  numberOfElements: number; // Total record of a page
  size: number;
  page: number;
}
