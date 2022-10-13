import ServiceTeam from "../service/ServiceTeam"
import { NextFunction, Request, Response } from "express"

class ControllerTeam {
  private teamService = ServiceTeam;
  GetAllTeams = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.teamService.GetAllTeams();
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };
  GetTeamById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const response = await this.teamService.GetByIdTeam(+id);
      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new ControllerTeam();
