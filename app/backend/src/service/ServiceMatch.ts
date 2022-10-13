import Team from "../database/models/Team";
import Match from "../database/models/Match";
import CustomError from "../helpers/CustomError";
import Token from "../helpers/Token";

interface IMatch extends ICreateMatch {
  teamHome: {
    teamName: string,
  };
  teamAway: {
    teamName: string,
  };
}

interface ICreateMatch {
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
      where: { ...filters },
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

    return this.GetAllMatches({ inProgress: filter });
  }

  CreateMatch = async (match: ICreateMatch, token: string | undefined ) => {
    Token.Verificate(token);
    console.log(match);
    
    const newMatch = await Match.create(match);
    return newMatch;
  };

  UpdateMatch = async (id: number, dataReq: object, token: string | undefined) => {
    Token.Verificate(token);
    const matchSearch = await Match.findOne({ include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
    where: { id },
    }) as IMatch; 
    if (matchSearch.inProgress === false) throw new CustomError(401, 'Match already finished!');
    const match = await Match.update(dataReq, { where: { id } });
    return match;
  };
}

export default new ServiceMatch();