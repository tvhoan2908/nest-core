export interface IBaseFilterRequest {
  page: number;
  size: number;
}

export class BaseFilterRequest implements IBaseFilterRequest {
  page = 1;
  size = 20;
}
