import { compareSync } from 'bcryptjs';

export default class Encrypt {
  public static Compare(value: string, valueRes: string): boolean {
    console.log(compareSync(value, valueRes))
    return compareSync(value, valueRes);
  };
}