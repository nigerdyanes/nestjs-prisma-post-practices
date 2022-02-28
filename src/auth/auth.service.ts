import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthSignUpDTO } from './dto/aut.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(auth: AuthSignUpDTO) {
    try {
      const hashPassword = await argon2.hash(auth.password);
      return this.prisma.user.create({
        data: {
          ...auth,
          password: hashPassword,
        },
        select: {
          id: true,
          username: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
