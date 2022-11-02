export class HelperUtils {
  static removeDuplicateValuesOfArrays(values: number[]): number[] {
    return Array.from(new Set(values));
  }

  static removeEmptyValueFromArray(arrays: any[]): any[] {
    return arrays.filter((item) => item);
  }

  static isTrue(value: string | number): boolean {
    if (value || value === 0) return true;

    return false;
  }
}
