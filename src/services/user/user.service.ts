import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from '@i-want-to-help-ukraine/protobuf/types/auth-service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) {}

  async getUser(authId: string): Promise<UserDto | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          authId,
        },
      });

      return user ? this.mapUser(user) : null;
    } catch (e) {
      this.logger.error(e);

      return null;
    }
  }

  private mapUser(dbUser: User): UserDto {
    const { id, authId, name } = dbUser;

    return {
      id,
      loginId: authId,
      name,
    };
  }
}
