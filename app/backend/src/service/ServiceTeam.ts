import CustomError from "../helpers/CustomError";
import Team from "../database/models/Team"

interface Iteam {
  id: number;
  teamName: string;
}
class ServiceTeam {
  GetAllTeams = async () : Promise<Iteam[] | []> => {
    const teams = await Team.findAll() as Iteam[];
    if(!teams) return [];
    return teams;
  };

  GetByIdTeam = async (id: number | undefined) : Promise<Iteam> => {
    if(!id) throw new CustomError(404, 'not found id')
    const team: any = await Team.findOne({ where: { id }}) as Iteam;
    if(!team) throw new CustomError(404, 'not found team for this id')
    return team;
  };
}

export default new ServiceTeam();
