import { Router } from "express";
import validateLogin from "../middlewares/LoginValidate";
import ControllerMatch from "./ControllerMatch";
import ControllerScore from "./ControllerScore";
import ControllerTeam from "./ControllerTeam";
import ControllerUser from "./ControllerUser";

const router = Router();

router.post('/login', validateLogin, ControllerUser.Login);
router.get('/login/validate', ControllerUser.Verify);
router.get('/teams', ControllerTeam.GetAllTeams);
router.get('/teams/:id', ControllerTeam.GetTeamById);
router.get('/matches', ControllerMatch.GetAllMatches);
router.post('/matches', ControllerMatch.CreateMatch);
router.patch('/matches/:id/finish', ControllerMatch.UpdateMatch);
router.patch('/matches/:id', ControllerMatch.UpdateInProgressMatch);
router.get('/leaderboard', ControllerScore.AllLeader);
router.get('/leaderboard/home', ControllerScore.HomeLeader);
router.get('/leaderboard/away', ControllerScore.AwayLeader);



export default router;