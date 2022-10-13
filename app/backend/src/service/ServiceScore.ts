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
      teams.sort((a, b) => (b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn))
  );

  private _joinScore = async (team : Iteam) : Promise<IScore> => {
    const scores = await Promise.all([
      this._getScore(team, { homeTeam: team.id }),
      this._getScore(team, { awayTeam: team.id }),
    ]);

    const payload : IScore = {
      name: team.teamName,
      totalPoints: scores[0].totalPoints + scores[1].totalPoints,
      totalGames: scores[0].totalGames + scores[1].totalGames,
      totalVictories: scores[0].totalVictories + scores[1].totalVictories,
      totalDraws: scores[0].totalDraws + scores[1].totalDraws,
      totalLosses: scores[0].totalLosses + scores[1].totalLosses,
      goalsFavor: scores[0].goalsFavor + scores[1].goalsFavor,
      goalsOwn: scores[0].goalsOwn + scores[1].goalsOwn,
      goalsBalance: scores[0].goalsBalance - scores[1].goalsBalance,
      efficiency: (((scores[0].totalPoints + scores[1].totalPoints)
        / ((scores[0].totalGames + scores[1].totalGames) * 3)) * 100).toFixed(2),
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