import { claimVoucherService } from '../services/event/claim-voucher.service';
import { createEventService } from '../services/event/create-event.service';
import { createReviewService } from '../services/event/create-review.service';
import { getEventService } from '../services/event/get-event.service';
import { getEventsByParamsService } from '../services/event/get-events-by-params.service';
import { getEventsService } from '../services/event/get-events.service';
import { getEventsByOrganizerService } from '../services/event/get-eventsByOrganizer.service';
import { updateEventService } from '../services/event/update-event.service';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  //CREATE EVENT
  async createEvent(req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const files = req.files as Express.Multer.File[];

      if (!files?.length) {
        throw new Error('no file uploaded');
      }

      const result = await createEventService(req.body, files[0]);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // CREATE REVIEW
  async createReview(req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const result = await createReviewService(req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET EVENT
  async getEventController(req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const id = req.params.id;
      const result = await getEventService(Number(id));

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //GET EVENTS BY ORGANIZER
  async getEventsByOrganizerController(req: Request,res: Response, next: NextFunction,
  ) :Promise<any>{
    try {
      const query = {
        id: parseInt(req.query.id as string),
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'start_date',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
        search: req.query.search as string,
      };
      const result = await getEventsByOrganizerService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // GET EVENTS BY PARAMS
  async getEventsByParamsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any> {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'start_date',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
        category: req.query.category as string,
        location: req.query.location as string,
      };
      const result = await getEventsByParamsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //GET EVENTS

  async getEventsController(req: Request, res: Response, next: NextFunction) :Promise<any> {
    try {
      const query = {
        take: parseInt(req.query.take as string) || 8,
        page: parseInt(req.query.page as string) || 1,
        sortBy: parseInt(req.query.sortBy as string) || 'start_date',
        sortOrder: parseInt(req.query.sortOrder as string) || 'desc',
        search: req.query.search as string,
      };

      const result = await getEventsService(query);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  //UPDATE EVENT
  async updateEventsController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any> {
    try {
      const files = req.files as Express.Multer.File[];

      const result = await updateEventService(
        Number(req.params.id),
        req.body,
        files[0],
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // CLAIM VOUCHER
  async claimVoucherController(
    req: Request,
    res: Response,
    next: NextFunction,
  ) :Promise<any>{
    try {
      const id = req.params.id;
      const result = await claimVoucherService(Number(id), req.body);

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
