import { IBasePageable } from "./base-pageable";

export interface IBaseResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  pagination?: IBasePageable;
}
