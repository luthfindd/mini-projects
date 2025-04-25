import { NextFunction, Request, Response } from "express";
import { registerService } from "../services/auth/register.service";
import { loginService } from "../services/auth/login.service";
import { KeepLoginService } from "../services/auth/keep-login.service";
import { forgotPasswordService } from "../services/auth/forgot-password.service";
import { resetPasswordService } from "../services/auth/reset-password.service";
import { getUserService } from "../services/auth/get-user.service";
import { promises } from "dns";
// export const register = async (req: Request, res: Response): Promise<any> => {
//   const { email, password, username, referral } = req.body;

//   const hashedPassword = await bcypt.hash(password, 10);
//   const referralCode = generateReferralCode;

//   try {
//     const existing = await prisma.user.findUnique({ where: { email } });
//     if (existing)
//       return res.status(400).json({ message: "Email Already Used" });

//     const user = await prisma.user.create({
//       data: {
//         email: email,
//         password: hashedPassword,
//         username: username,
//         role: "customer",
//         refferal_code: referralCode,
//       },
//     });
//     console.log(user);
//     //handle referral kalo ada
//     if (referral) {
//       const referrer = await prisma.user.findFirst({
//         where: { refferal_code: referral },
//       });
//       if (referrer) {
//         await prisma.referrals.create({
//           data: {
//             referrer_id: referrer.user_id,
//             referee_id: user.user_id,
//           },
//         });

//         const now = new Date();
//         const expiry = new Date(now);
//         expiry.setMonth(expiry.getMonth() + 3);

//         await prisma.user_points.create({
//           data: {
//             user_id: referrer.user_id,
//             points: 10000,
//             source: "referral",
//             earned_date: now,
//             expiry_date: expiry,
//             status: "active",
//           },
//         });
//       }
//     }
//     const token = signToken({ user_id: user.user_id, role: user.role });
//     res.json({ token, user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal error" });
//   }
// };

// export const login = async (req: Request, res: Response): Promise<any> => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({ message: "Email Not Found" });
//     }

//     const isMatch = await bcypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "incorrect password" });
//     }

//     const token = signToken({
//       user_id: user.user_id,
//       role: user.role,
//     });
//     res.json({
//       token,
//       user: {
//         user_id: user.user_id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         referral_code: user.refferal_code,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


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
      const id = req.body.user.id;

      const result = await KeepLoginService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // FORGOT-PASSWORD
  async forgotPasswordController(
    req: Request,
    res: Response,
    next: NextFunction,
  ):Promise<any> {
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

