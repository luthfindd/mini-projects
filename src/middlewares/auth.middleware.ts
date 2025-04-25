// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// interface JwtPayload {
//   user_id: string;
//   role: 'customer' | 'organizer';
//   iat: number;
//   exp: number;
// }

// export const verifyToken = (req: Request,res: Response,next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized: Token missing' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
//     req.user = decoded; 
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// // Middleware tambahan untuk role-check
// export const restrictTo = (role: 'customer' | 'organizer') => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (req.user?.role !== role) {
//       return res.status(403).json({ message: 'Forbidden: Access denied' });
//     }
//     next();
//   };
// };
