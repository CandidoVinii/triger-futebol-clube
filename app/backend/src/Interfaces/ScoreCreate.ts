import IMatch from "./IMatch";
import Iteam from "./ITeam";
import IScore from "./IScore";


export default class ScoreCreate {
  private name: string;
  private totalPoints = 0;
  private totalGames = 0;
  private totalVictories = 0;
  private totalDraws = 0;
  private totalLosses = 0;
  private goalsFavor = 0;
  private goalsOwn = 0;
  private goalsBalance = 0;
  private efficiency: string;

  constructor(private team : Iteam, private match : IMatch[]){
    this.name = team.teamName;

    this.countScore();
    
    this.totalPoints = (3 * this.totalVictories + this.totalDraws);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = ((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  };

  private countScore() {
    this.match.map((item) => {
      this.totalGames ++;
      if(item.homeTeam === this.team.id) {
        this.goalsFavor += item.homeTeamGoals;
        this.goalsOwn += item.awayTeamGoals;

        if(item.homeTeamGoals > item.awayTeamGoals) this.totalVictories ++;
        else if(item.homeTeamGoals < item.homeTeamGoals) this.totalLosses ++;
        else this.totalDraws ++;
      } else {
        this.goalsFavor += item.awayTeamGoals;
        this.goalsOwn += item.homeTeamGoals;

        if(item.homeTeamGoals < item.awayTeamGoals) this.totalVictories ++;
        else if(item.homeTeamGoals > item.awayTeamGoals) this.totalLosses ++;
        else this.totalDraws ++;
      }
    });
  }

  getScoreBoard() : IScore {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  };
}