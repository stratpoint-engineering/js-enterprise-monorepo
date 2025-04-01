import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UserRole } from '@enterprise-monorepo/shared';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    },
  },
})
export class User {
  @ApiProperty({ description: 'The user ID' })
  id: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({ description: 'The user email address' })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  @ApiProperty({ description: 'The user first name', required: false })
  firstName?: string;

  @Prop()
  @ApiProperty({ description: 'The user last name', required: false })
  lastName?: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  @ApiProperty({
    description: 'The user role',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({ default: true })
  @ApiProperty({ description: 'Whether the user is active', default: true })
  isActive: boolean;

  @Prop()
  @ApiProperty({
    description: 'When the user last logged in',
    required: false,
  })
  lastLogin?: Date;

  @Prop()
  @ApiProperty({
    description: 'The user refresh token',
    required: false,
  })
  refreshToken?: string;

  @ApiProperty({ description: 'When the user was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the user was last updated' })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
