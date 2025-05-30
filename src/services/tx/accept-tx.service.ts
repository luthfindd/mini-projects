import prisma from '../../prisma/prisma';
import { Transaction } from '@prisma/client';

export const acceptTransactionService = async (
  body: Pick<Transaction, 'id'>,
): Promise<void> => {
  try {
    const { id } = body;
    const tx = await prisma.transaction.findFirst({
      where: { id },
      select: { status: true },
    });

    if (!tx) {
      throw new Error('Transaction not found !');
    }

    await prisma.transaction.update({
      where: { id },
      data: { status: 'COMPLETE' },
    });
  } catch (error) {
    throw error;
  }
};
