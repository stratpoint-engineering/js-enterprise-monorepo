import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: "user@example.com",
    description: "User email address",
  })
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
  })
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @ApiProperty({
    example: "John",
    description: "User first name",
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: "Doe",
    description: "User last name",
  })
  @IsString()
  @IsOptional()
  lastName?: string;
}
