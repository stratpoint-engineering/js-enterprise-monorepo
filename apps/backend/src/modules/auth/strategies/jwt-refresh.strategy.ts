import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";

import { UsersService } from "../../users/users.service";
import { Request } from "express";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>("JWT_REFRESH_SECRET") ||
        "fallback-refresh-secret-do-not-use-in-production",
      passReqToCallback: true as any,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.body.refreshToken;
    const user = await this.usersService.findById(payload.sub);

    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );

    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    return user;
  }
}
