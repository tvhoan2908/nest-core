export abstract class BaseStoreRequest<T> {
  abstract toEntity(): T | Promise<T>;
}
