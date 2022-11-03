import * as bcrypt from "bcrypt";

export class HashUtils {
  static async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(value, salt);
  }
}
