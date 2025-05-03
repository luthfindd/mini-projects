import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

import { addMonths } from 'date-fns';
import { hashPassword } from '../../libs/bcrypt';

const prisma = new PrismaClient();
export const registerService = async (body: Omit<User, 'id'>) => {
    try {
      const { email, password, referralCode, fullName } = body;
  
      const existingUser = await prisma.user.findFirst({
        where: { email },
      });
  
      if (existingUser) {
        throw new Error('Email already exist!');
      }
  
      const hashedPassword = await hashPassword(password);
      const GeneratereferralCode = await Math.random()
        .toString(36)
        .substring(2, 7);
  
      const newUser = await prisma.user.create({
        data: {
          ...body,
          fullName: fullName,
          password: hashedPassword,
          referralCode: GeneratereferralCode,
          point: 0,
          pointExpiredDate: new Date(),
        },
      });
      console.log("step 1")
  
      const userCoupon = String(
        newUser.fullName.substring(0, 3) + Math.ceil(Math.random() * 1000),
      ).toUpperCase();
  
      if (referralCode) {
        const referral = await prisma.user.findFirst({
          where: { referralCode: referralCode },
        });
        console.log("step 2")
        if (!referral) {
          console.log("error")
        }
        const today = new Date();
        const expiredDate = addMonths(today, 3).toISOString();
  
        await prisma.user.update({
          where: { id: referral?.id },
          data: {
            point: { increment: 10000 },
            pointExpiredDate: expiredDate,
          },
        });
        console.log("step 3")
  
        await prisma.user.update({
          where: { id: newUser.id },
          data: {
            userReward: true,
          },
        });
        console.log("step 4")
        await prisma.coupon.create({
          data: {
            isUse: false,
            code: userCoupon,
            discountAmount: 10000,
            expirationDate: expiredDate,
            userId: newUser.id,
          },
        });
        console.log("step 5")
      }
      return {
        message: 'Register success !',
        data: newUser,
      };
    } catch (error) {
      console.log(error)
      throw error;
    }
  };