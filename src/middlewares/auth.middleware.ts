import { Inject, Injectable, HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { ApiError } from '../filter/api.error';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // @Inject()
  // private readonly userRepository: UserRepository;
  @InjectRepository(UserRepository)
  private userRepository: UserRepository;

  @Inject()
  private readonly config: ConfigService;

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (authHeaders && authHeaders.split(' ')[1]) {
      const token = authHeaders.split(' ')[1];
      console.log('try');
      try {
        const decoded: any = jwt.verify(token, this.config.get('jwtSecretKey'));
        const user = await this.userRepository.findOne({
          email: decoded.email,
        });
        if (!user) {
          throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized 1');
        }
        req['user'] = user;

        next();

        res.on('finish', () => {});
      } catch (error) {
        console.log('error', error);

        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized 2');
      }
    } else {
      throw new ApiError(HttpStatus.UNAUTHORIZED, 'Unauthorized 3');
    }
  }
}
