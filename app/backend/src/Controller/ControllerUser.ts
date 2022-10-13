import ServiceUser from '../service/ServiceUser';
import { Request, Response } from "express"

class ControllerUser {
  private userService = ServiceUser;

  Login = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const response = await this.userService.Login(user);
      return res.status(200).send({ token: response })
    } catch (error) {
      return res.status(401).send({ message: 'All fields must be filled' });
    }
  };

  Verify = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers;
      const response = await this.userService.TokenValidate(authorization);
      return res.status(200).send({ role: response });
    } catch (error) {
      return res.status(404).send({ message: 'Incorrect email or password' });
    }
  }
}

export default new ControllerUser();