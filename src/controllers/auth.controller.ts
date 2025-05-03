import { NextFunction, Request, Response } from "express";
import { registerService } from "../services/auth/register.service";
import { loginService } from "../services/auth/login.service";
import { KeepLoginService } from "../services/auth/keep-login.service";
import { forgotPasswordService } from "../services/auth/forgot-password.service";
import { resetPasswordService } from "../services/auth/reset-password.service";
import { getUserService } from "../services/auth/get-user.service";

export class AuthController {
  //register
  async registerController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);

      res.status(200).send(result);
    }catch (error){
      next(error);
    }
  }

  // login
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // KEEP LOGIN
  async keepLoginController(req: Request, res: Response, next: NextFunction) :Promise<any>{
    try {
      const id = req.params.id;

      const result = await KeepLoginService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // FORGOT-PASSWORD
  async forgotPasswordController( req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const result = await forgotPasswordService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  
  // RESET PASSWORD
  async resetPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any>{
    try {
      const userId = Number(req.body.user.id);
      const password = req.body.password;
      const result = await resetPasswordService(userId, password);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  

  // GET USER
  async getUserController(req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const id = req.params.id;
      const result = await getUserService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

