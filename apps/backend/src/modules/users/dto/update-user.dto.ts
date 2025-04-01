import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional, IsEnum, IsDate } from "class-validator";
import { UserRole } from "@enterprise-monorepo/shared";

export class UpdateUserDto {
  @ApiProperty({
    description: "User email address",
    example: "user@example.com",
    required: false,
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: "User first name",
    example: "John",
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: "User last name",
    example: "Doe",
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({
    description: "User role",
    enum: UserRole,
    required: false,
  })
  @IsEnum(UserRole, { message: "Invalid user role" })
  @IsOptional()
  role?: UserRole;

  @ApiProperty({
    description: "User active status",
    example: true,
    required: false,
  })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: "User refresh token",
    required: false,
  })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({
    description: "User last login timestamp",
    required: false,
  })
  @IsDate()
  @IsOptional()
  lastLogin?: Date;
}
