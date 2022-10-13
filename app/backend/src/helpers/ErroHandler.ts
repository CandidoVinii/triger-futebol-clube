import { ErrorRequestHandler, Response, Request, NextFunction } from 'express';
import CustomError from './CustomError';

const ErroHandler: ErrorRequestHandler = (
  err,
  _req: Request,
  res: Response,
  _next: NextFunction ) => {
  if (err instanceof CustomError) {
    res.status(err.code).send({ message: err.message });
  } else if (err instanceof Error) {
    res.status(500).send({ message: err.message });
  }
};

export default ErroHandler;