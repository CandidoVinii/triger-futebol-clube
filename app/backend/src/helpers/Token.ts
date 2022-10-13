import * as jwt from 'jsonwebtoken';
import CustomError from './CustomError';

export default class Token {
  public static Sign(payload: object) : string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  };

  public static Verificate(token: string | undefined) : jwt.JwtPayload | string {
    if(!token) throw new CustomError(401, 'Token must be a valid token');
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      throw new CustomError(401, 'Token must be a valid token');
    }
  }
}