import { acceptTransactionService } from '../services/tx/accept-tx.service';
import { createTransactionService } from '../services/tx/create-tx.service';
import { getTransactionService } from '../services/tx/get-tx.service';
import { getTransactionsService } from '../services/tx/get-txs.service';
import { rejectTransactionService } from '../services/tx/reject-tx.service';
import { updateTransactionService } from '../services/tx/update-tx.service';
import { TransactionStatus } from '../types/transactionStatus.type';
import { NextFunction, Request, Response } from 'express';

export class TransactionController {
  // CREATE TX
  async createTransaction(req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await createTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  // ACCEPT TX
  async acceptTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any>{
    try {
      const result = await acceptTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // REJECT TX
  async rejectTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any> {
    try {
      const result = await rejectTransactionService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET TX
  async getTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any> {
    try {
      const id = req.params.id;
      const result = await getTransactionService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // UPDATE TX
  async updateTransactionController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any>{
    try {
      const files = req.files as Express.Multer.File[];

      const result = await updateTransactionService(
        Number(req.params.id),
        req.body,
        files[0],
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET TRANSACTIONS
  async getTransactionsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any>{
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'createdAt',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
        search: req.query.search as string,
        status: req.query.status as TransactionStatus,
      };
      const result = await getTransactionsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
