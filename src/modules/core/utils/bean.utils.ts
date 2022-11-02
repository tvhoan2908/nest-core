export class BeanUtils {
  static copyProperties(source: object, target: object): object {
    for (const key in source) {
      if (key in target) target[key] = source[key];
    }

    return target;
  }

  static parseUndefinedToNullProperties(source: object): object {
    for (const i in source) {
      if (source[i] === undefined || source[i] === "") {
        source[i] = null;
      }
    }

    return source;
  }

  static removeUndefinedProperties(source: object): object {
    for (const i in source) {
      if (source[i] === undefined) {
        delete source[i];
      }
    }

    return source;
  }
}
