import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserPayload } from 'src/authentication/dto/user-payload.dto';

export const LoggedUser = createParamDecorator(
  (data: unknown, req: Request): UserPayload => {
    return req.user as UserPayload;
  },
);
