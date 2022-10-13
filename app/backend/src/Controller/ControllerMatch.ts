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

  UpdateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const { id } = req.params
      await this.matchService.UpdateMatch(+id, { inProgress: false }, authorization);
      return res.status(200).send({ message: "Finished" })
    } catch(err) {
      next(err);
    };
  };

  UpdateInProgressMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { authorization } = req.headers;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const resp = { homeTeamGoals, awayTeamGoals };
      await this.matchService.UpdateMatch(+id, resp, authorization);
      return res.status(200).send({ message: 'Match updated successfully' });
    } catch (err) {
      next(err);
    };
  };
}


export default new ControllerMatch();
