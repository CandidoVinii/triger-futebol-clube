import { NextFunction, Request, Response } from "express";
import ServiceScore from "../service/ServiceScore";

class ControllerScore {
  private serviceScore = ServiceScore;

  HomeLeader = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.serviceScore.Get('home');
      return res.status(200).send(response);
    } catch(err) {
      next(err);
    };
  };

  AwayLeader = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.serviceScore.Get('away');
      return res.status(200).send(response);
    } catch(err) {
      next(err);
    };
  };

  AllLeader = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.serviceScore.Get('full');
      return res.status(200).send(response);
    } catch(err) {
      next(err);
    };
  };


}

export default new ControllerScore();

