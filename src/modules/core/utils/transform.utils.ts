export class TransformUtils {
  static parseNumber({ value }): number {
    value = value && +value;
    if (isNaN(value) || value === "") return null;

    return value;
  }

  static parseNumberArray({ value }): number[] {
    if (Array.isArray(value) && value.length > 0) {
      return value.filter((item) => +item).map((item) => +item);
    }

    // Case parse value not array
    return !Array.isArray(value) && !Number.isNaN(+value) ? [+value] : value;
  }

  static trim({ value }): string {
    return value && value.toString().trim();
  }

  static parseString({ value }): string {
    return value && value.toString().replace(/  +/g, " ").trim();
  }
}
