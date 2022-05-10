import { Controller, UnauthorizedException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetTokenDto,
  TokenResponseDto,
  GetUserDto,
  UserResponseDto,
} from '@i-want-to-help-ukraine/protobuf/types/auth-service';
import { JwtService } from 'src/services/jwt/jwt.service';
import { UserService } from '../../services/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @GrpcMethod('AuthServiceRPC', 'getUser')
  async getUser(request: GetUserDto): Promise<UserResponseDto> {
    const user = await this.userService.getUser(request.authId);

    return {
      user: user || undefined,
    };
  }

  @GrpcMethod('AuthServiceRPC', 'getToken')
  async getToken(request: GetTokenDto): Promise<TokenResponseDto> {
    const user = await this.userService.getUser(request.authId);

    if (user === null) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.accessToken();
    const refreshToken = this.jwtService.refreshToken();

    return {
      accessToken,
      refreshToken,
    };
  }
}
