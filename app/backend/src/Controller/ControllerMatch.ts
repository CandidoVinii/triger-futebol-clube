import ServiceMatch from "../service/ServiceMatch";
import { NextFunction, Request, Response } from "express"

class ControllerMatch {
  private matchService = ServiceMatch;
  GetAllMatches = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;
      let result;
      if(!inProgress || inProgress === '') {
        result = await this.matchService.GetAllMatches({});
      } else {
        result = await this.matchService.GetMatchesInProgress(inProgress.toString());
      }
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    };
  };
  CreateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const response = await this.matchService.CreateMatch(req.body, authorization);
      return res.status(201).json(response);
    } catch(err) {
      next(err);
    };
  };
}


export default new ControllerMatch();
