import * as bcrypt from "bcrypt";

export class HashUtils {
  static async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(value, salt);
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
