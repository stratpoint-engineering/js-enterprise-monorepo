import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";

import { UsersService } from "../users/users.service";
import { User } from "../users/entities/user.entity";
import { RegisterDto } from "./dto";
import { UserRole } from "@enterprise-monorepo/shared";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    if (!user.isActive) {
      throw new UnauthorizedException("User account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // Update last login
    user.lastLogin = new Date();
    await this.usersService.update(user.id, { lastLogin: user.lastLogin });

    return user;
  }

  async login(user: User) {
    const tokens = this.generateTokens(user);

    // Save refresh token hash
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: this.usersService.buildUserResponse(user),
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException("Email already exists");
    }

    // Create new user with USER role by default
    const newUser = await this.usersService.create({
      ...registerDto,
      role: UserRole.USER,
    });

    return {
      user: this.usersService.buildUserResponse(newUser),
    };
  }

  async refreshTokens(user: User) {
    const tokens = this.generateTokens(user);

    // Update refresh token in DB
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async logout(userId: string) {
    // Clear refresh token
    await this.usersService.update(userId, { refreshToken: undefined });
    return { success: true };
  }

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
        expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES_IN"),
      }),
    };
  }
}
