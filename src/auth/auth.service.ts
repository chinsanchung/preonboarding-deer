import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  jwtSign(user: User): { access_token: string } {
    const payload = {
      id: user.id,
      user_id: user.user_id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
