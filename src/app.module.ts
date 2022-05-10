import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './services/user/user.service';
import { JwtService } from './services/jwt/jwt.service';
import { AuthController } from './controllers/auth/auth.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('BACKOFFICE_AUTH_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, JwtService, PrismaService],
})
export class AppModule {}
