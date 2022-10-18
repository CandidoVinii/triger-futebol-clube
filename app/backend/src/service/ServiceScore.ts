import Iteam from "../Interfaces/ITeam";
import IScore from "../Interfaces/IScore";
import ServiceMatch from "./ServiceMatch";
import ScoreCreate from "../Interfaces/ScoreCreate";
import ServiceTeam from "./ServiceTeam";


class ServiceScore {
  private _getScore = async (team: Iteam, typeMatch: object) : Promise<IScore> => {
    const result = await ServiceMatch.GetAllMatches({ inProgress: false, ...typeMatch });

    return new ScoreCreate(team, result).getScoreBoard();
  };

  private _orderScore = (teams: IScore[]) => (
      teams.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn));

  private _joinScore = async (team : Iteam) : Promise<IScore> => {
    const scores = await Promise.all([
      this._getScore(team, { homeTeam: team.id }),
      this._getScore(team, { awayTeam: team.id }),
    ]);

    const payload : IScore = {
      name: team.teamName,
      totalPoints: Number(scores[0].totalPoints) + Number(scores[1].totalPoints),
      totalGames: Number(scores[0].totalGames) + Number(scores[1].totalGames),
      totalVictories: Number(scores[0].totalVictories) + Number(scores[1].totalVictories),
      totalDraws: Number(scores[0].totalDraws) + Number(scores[1].totalDraws),
      totalLosses: Number(scores[0].totalLosses) + Number(scores[1].totalLosses),
      goalsFavor: Number(scores[0].goalsFavor) + Number(scores[1].goalsFavor),
      goalsOwn: Number(scores[0].goalsOwn) + Number(scores[1].goalsOwn),
      goalsBalance: Number(scores[0].goalsBalance) + Number(scores[1].goalsBalance),
      efficiency: (((Number(scores[0].totalPoints) + Number(scores[1].totalPoints))
        / ((Number(scores[0].totalGames) + Number(scores[1].totalGames)) * 3)) * 100).toFixed(2),
    };
    return payload;
  };

  Get = async (type: string) => {
    const list = await ServiceTeam.GetAllTeams();
    const asynScore = list.map((item) => {
      if(type === 'home') return this._getScore(item, { homeTeam: item.id })
      if(type === 'away') return this._getScore(item, { awayTeam: item.id })      
      return this._joinScore(item);
    });
    const calculate = await Promise.all(asynScore) as IScore[];
    return this._orderScore(calculate);
  };
}

export default new ServiceScore();