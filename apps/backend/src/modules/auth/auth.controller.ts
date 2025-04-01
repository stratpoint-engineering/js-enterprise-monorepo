import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Request as ExpressRequest } from "express";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { LoginDto, RegisterDto, RefreshTokenDto } from "./dto";
import { Public } from "./decorators/public.decorator";
import { User } from "../users/entities/user.entity";

// Define the expected Express Request with user property
interface RequestWithUser extends ExpressRequest {
  user: User & { id: string };
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User login" })
  @ApiResponse({ status: 200, description: "Returns JWT tokens and user info" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async login(@Request() req: RequestWithUser, @Body() _loginDto: LoginDto) {
    // LocalAuthGuard already validates the user credentials
    return this.authService.login(req.user);
  }

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({ status: 201, description: "User created successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({ status: 200, description: "Returns new JWT tokens" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async refreshToken(
    @Request() req: RequestWithUser,
    @Body() _refreshTokenDto: RefreshTokenDto
  ) {
    // JwtRefreshGuard already validates the refresh token
    return this.authService.refreshTokens(req.user);
  }

  @ApiBearerAuth()
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200, description: "Logout successful" })
  async logout(@Request() req: RequestWithUser) {
    return this.authService.logout(req.user.id);
  }
}
