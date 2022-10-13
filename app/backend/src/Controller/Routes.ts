import { Router } from "express";
import validateLogin from "../middlewares/LoginValidate";
import ControllerTeam from "./ControllerTeam";
import ControllerUser from "./ControllerUser";

const router = Router();

router.post('/login', validateLogin, ControllerUser.Login);
router.get('/login/validate', ControllerUser.Verify);
router.get('/teams', ControllerTeam.GetAllTeams);


export default router;