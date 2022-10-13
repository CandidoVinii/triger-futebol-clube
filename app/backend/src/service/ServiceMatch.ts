import Team from "../database/models/Team";
import Match from "../database/models/Match";
import CustomError from "../helpers/CustomError";

interface IMatch extends INewMatch {
  teamHome: {
    teamName: string,
  };
  teamAway: {
    teamName: string,
  };
}

interface INewMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

class ServiceMatch {
  GetAllMatches = async (filters: any) : Promise<IMatch[] | []> => {
    const response = await Match.findAll({
      include: [
        {
          model: Team, as: 'teamHome', attributes: ['teamName']
        },
        {
          model: Team, as: 'teamAway', attributes: ['teamName']
        }
      ],
      where: { inProgress: filters },
    }) as IMatch[];
    if (!response) return [];
    return response;
  };

  private forBoolean = (value: string) : boolean | undefined => {
    if(value.toLowerCase() === 'true') return true;
    if(value.toLowerCase() === 'false') return false;
    return undefined;
  }

  GetMatchesInProgress = async (inProgress: string) : Promise<IMatch[] | []> => {
    const filter = this.forBoolean(inProgress);
    if(filter === undefined) throw new CustomError(404, 'InProgress not found');

    return this.GetAllMatches(filter);
  }
}

export default new ServiceMatch();