import ServiceUser from '../service/ServiceUser';
import { NextFunction, Request, Response } from "express"

class ControllerUser {
  private userService = ServiceUser;

  Login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const response = await this.userService.Login(user);
      return res.status(200).send({ token: response })
    } catch (error) {
      next(error)
    }
  };

  Verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const response = await this.userService.TokenValidate(authorization);
      return res.status(200).send({ role: response });
    } catch (error) {
      next(error);
    }
  };
}

export default new ControllerUser();
