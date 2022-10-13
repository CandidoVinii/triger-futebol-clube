import { Router } from "express";
import validateLogin from "../middlewares/LoginValidate";
import ControllerUser from "./ControllerUser";

const router = Router();

router.post('/login', validateLogin, ControllerUser.Login);
router.post('/login/validate', ControllerUser.Verify)


export default router;