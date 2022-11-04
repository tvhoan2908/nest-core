export abstract class BaseStoreRequest<T> {
  abstract toEntity(): Promise<T>;
}
