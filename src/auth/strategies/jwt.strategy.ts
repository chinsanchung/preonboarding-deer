import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const { id, user_id, loginedAt } = payload;
    const user = await this.usersService.findOneByUserId(user_id);

    const tokenLoginedAt = new Date(loginedAt).getTime();
    const userLoginedAt = new Date(user.loginedAt).getTime();

    if (tokenLoginedAt !== userLoginedAt) {
      throw new UnauthorizedException('올바르지 않은 토큰입니다');
    }
    return { id, user_id, loginedAt };
  }
}
