import * as jwt from 'jsonwebtoken';

export default class Token {
  public static Sign(payload: object) : string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  };

  public static Verificate(token: string | undefined) : jwt.JwtPayload | string {
    if(!token) return 'Token invalid';
    try {
      
      return jwt.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return 'Token invalid'
    }
  }
}