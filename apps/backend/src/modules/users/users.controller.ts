import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { Request as ExpressRequest } from "express";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserRole } from "@enterprise-monorepo/shared";
import { User } from "./entities/user.entity";

// Define the expected Express Request with user property
interface RequestWithUser extends ExpressRequest {
  user: User & { id: string };
}

@ApiTags("users")
@Controller("users")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Create a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 409, description: "Email already exists." })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Get all users" })
  @ApiResponse({
    status: 200,
    description: "List of all users.",
    type: [UserResponseDto],
  })
  @ApiQuery({
    name: "role",
    required: false,
    enum: UserRole,
    description: "Filter users by role",
  })
  async findAll(@Query("role") role?: UserRole): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a user by ID" })
  @ApiResponse({
    status: 200,
    description: "User details.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  async findOne(@Param("id") id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a user" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully updated.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request." })
  @ApiResponse({ status: 404, description: "User not found." })
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Delete a user" })
  @ApiResponse({
    status: 200,
    description: "The user has been successfully deleted.",
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: "User not found." })
  async remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Get("me")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({
    status: 200,
    description: "Current user details.",
    type: UserResponseDto,
  })
  async getCurrentUser(@Request() req: RequestWithUser): Promise<User> {
    return this.usersService.findById(req.user.id);
  }
}
