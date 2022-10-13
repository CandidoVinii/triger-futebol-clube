import Encrypt from '../helpers/Encrypt';
import Token from '../helpers/Token';
import User from '../database/models/User';
import CustomError from '../helpers/CustomError';

interface user {
  email: string;
  password: string;
}

interface loged {
  id: number;
  email: string;
  username: string;
  role: string;
}
class ServiceUser {
  private tokenCreate = Token;
  Login = async (user: user) => {
    const { email, password } = user;
    const dbUser: any = await User.findOne({ where: { email }});
    const verifyPassword = Encrypt.Compare(password, dbUser.password);
    if(!dbUser || !verifyPassword) {
      throw new CustomError(401, 'Incorrect email or password');
    } else {
      const payload = {
        id: dbUser.id,
        email: dbUser.email,
        username: dbUser.username,
        role: dbUser.role
      };
      return this.tokenCreate.Sign(payload);
    };

  };
  TokenValidate = async (token: string | undefined) => {
    const { id } = this.tokenCreate.Verificate(token) as loged;
    const dbUser = await User.findOne({ where: { id } });
    return dbUser?.role
  }
}

export default new ServiceUser();