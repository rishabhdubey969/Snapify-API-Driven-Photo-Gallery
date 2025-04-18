import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConst } from '../../jwt_security/jwt.const';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization as string;
    const parts = authorizationHeader.split(' ');
    const token = parts[1];

    try {
      // Replace 'YOUR_SECRET_KEY' with your actual secret key used to sign the JWT
      const decoded = jwt.verify(token, jwtConst.secret); 

      // Optionally, you can store the decoded token in the request object
      (req as any).user = decoded; 

      // Proceed to the next middleware/controller
      next();
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.FORBIDDEN);
    }
  }
}
