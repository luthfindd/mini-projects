import prisma from '../../prisma/prisma';
import { Transaction } from '@prisma/client';
import { join, resolve } from 'path';
import fs from 'fs';

const defaultDir = '../../../public/txProof';

export const updateTransactionService = async (
  id: number,
  body: Partial<Transaction>,
  file: Express.Multer.File,
) => {
  try {
    const tx = await prisma.transaction.findFirst({
      where: { id },
    });

    if (!tx) {
      throw new Error('Transaction not found');
    }

    if (file) {
      body.paymentProof = `/txProof/${file.filename}`;
      console.log(file)
      const imagePath = resolve(__dirname, '../../../public', tx.paymentProof);
      console.log(tx)
      console.log(imagePath)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await prisma.transaction.update({
      where: { id },
      data: { ...body, status: 'WAITING' },
    });
  } catch (error) {
    if (file) {
      const imagePath = resolve(__dirname, defaultDir, file.filename);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    console.log(error);
    throw error;
  }
};
