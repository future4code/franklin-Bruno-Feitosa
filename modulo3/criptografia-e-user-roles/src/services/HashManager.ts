import bcrypt from "bcryptjs";

export class HashManager {
  public hash = async (plainText: string) => {
    const rounds = Number(process.env.BCRYPT_COST);
    const salt = await bcrypt.genSalt(rounds);
    const result = await bcrypt.hash(plainText, salt);
    return result;
  };

  public compare = async (
    plainText: string,
    hash: string
  ): Promise<boolean> => {
    const result = await bcrypt.compare(plainText, hash);
    return result;
  };
}
