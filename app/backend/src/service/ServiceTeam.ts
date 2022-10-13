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
}

export default new ServiceTeam();
