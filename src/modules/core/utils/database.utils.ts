import { FindOptionsWhere, Repository } from "typeorm";
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

  static async findAndCount<T>(repository: Repository<T>, request: IBaseFilterRequest, query: FindOptionsWhere<T>): Promise<[T[], number]> {
    const skip = (request.page - 1) * request.size;

    return repository.findAndCount({
      where: query,
      skip,
      take: request.size,
    });
  }
}
