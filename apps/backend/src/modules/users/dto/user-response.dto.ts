import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@enterprise-monorepo/shared';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '60d0fe4f5311236168a109ca',
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    example: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Whether the user is active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'When the user last logged in',
    example: '2023-04-15T12:00:00.000Z',
    required: false,
  })
  lastLogin?: Date;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2023-04-01T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2023-04-10T15:45:00.000Z',
  })
  updatedAt: Date;
}
