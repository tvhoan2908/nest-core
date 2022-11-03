import { BaseFilterRequest } from "../requests/base-filter.request";
import { ResponseEntity } from "../resources/base-response";
import { DatabaseUtils } from "../utils/database.utils";

export class BaseController {
  findAndPaginate<T>(request: BaseFilterRequest, data: T[], total: number): ResponseEntity<T> {
    const pagination = DatabaseUtils.paginate(request, data.length, total);

    return new ResponseEntity<T[]>(data, "Get data successfully !", pagination);
  }
}
