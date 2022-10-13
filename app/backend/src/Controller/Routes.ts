import { Router } from "express";
import validateLogin from "../middlewares/LoginValidate";
import ControllerMatch from "./ControllerMatch";
import ControllerTeam from "./ControllerTeam";
import ControllerUser from "./ControllerUser";

const router = Router();

router.post('/login', validateLogin, ControllerUser.Login);
router.get('/login/validate', ControllerUser.Verify);
router.get('/teams', ControllerTeam.GetAllTeams);
router.get('/teams/:id', ControllerTeam.GetTeamById);
router.get('/matches', ControllerMatch.GetAllMatches);
router.post('/matches', ControllerMatch.CreateMatch);


export default router;