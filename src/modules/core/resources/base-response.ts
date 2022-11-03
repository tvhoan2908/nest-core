import { IBasePageable } from "./base-pageable";

export interface IBaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  pagination?: IBasePageable;
}

export interface IPaginationResponse<T> {
  items: T[];
  total: number;
}

export class ResponseEntity<T> implements IBaseResponse<T> {
  success = true;
  code = 200;
  data = null;
  message: string = null;
  pagination?: IBasePageable;

  constructor(data: T, message?: string, pagination?: IBasePageable) {
    this.data = data;
    this.message = message;
    this.pagination = pagination;
  }
}
