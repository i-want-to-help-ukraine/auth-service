import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private nestJwtService: NestJwtService) {}

  accessToken(): string {
    return this.nestJwtService.sign({});
  }

  refreshToken(): string {
    return this.nestJwtService.sign({});
  }
}
