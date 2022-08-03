import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `method:${req.method} to ${req.baseUrl} response status ${res.statusCode}`,
    );
    next();
  }
}
