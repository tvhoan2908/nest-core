import { IBaseFilterRequest } from "../requests/base-filter.request";
import { IBasePageable } from "../resources/base-pageable";

export class DatabaseUtils {
  static paginate(request: IBaseFilterRequest, totalRecord: number, numberOfElements: number): IBasePageable {
    const totalPages = Math.ceil(totalRecord / numberOfElements);

    return {
      page: request.page,
      size: request.size,
      totalPages,
      numberOfElements,
      totalElements: totalRecord,
    };
  }
}
