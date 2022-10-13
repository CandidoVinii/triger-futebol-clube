import ServiceTeam from "../service/ServiceTeam"
import { NextFunction, Request, Response } from "express"

class ControllerTeam {
  private teamService = ServiceTeam;
  GetAllTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.teamService.GetAllTeams();
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
}

export default new ControllerTeam();
