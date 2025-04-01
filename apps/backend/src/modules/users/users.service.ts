import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "./entities/user.entity";
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dto";
import { UserRole } from "@enterprise-monorepo/shared";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  /**
   * Find all users
   */
  async findAll(role?: UserRole): Promise<User[]> {
    const query = role ? { role } : {};
    return this.userModel.find(query).exec();
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  /**
   * Find a user by email with password
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email: email.toLowerCase() })
      .select("+password")
      .exec();
  }

  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new this.userModel({
      ...createUserDto,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return newUser.save();
  }

  /**
   * Update a user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // Verify user exists
    await this.findById(id);

    // If email is being updated, check it's not already taken
    if (updateUserDto.email) {
      const normalizedEmail = updateUserDto.email.toLowerCase();
      const existingUser = await this.userModel
        .findOne({
          email: normalizedEmail,
          _id: { $ne: id },
        })
        .exec();

      if (existingUser) {
        throw new ConflictException("Email already exists");
      }

      // Ensure email is normalized
      updateUserDto.email = normalizedEmail;
    }

    // Update using findByIdAndUpdate
    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateUserDto },
        { new: true } // Return the updated document
      )
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return updatedUser;
  }

  /**
   * Delete a user
   */
  async remove(id: string): Promise<User> {
    await this.findById(id); // Verify user exists
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedUser;
  }

  /**
   * Update user's refresh token
   */
  async setRefreshToken(
    userId: string,
    refreshToken: string | null
  ): Promise<void> {
    await this.userModel.updateOne({ _id: userId }, { refreshToken }).exec();
  }

  /**
   * Update user's last login date
   */
  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel
      .updateOne({ _id: userId }, { lastLogin: new Date() })
      .exec();
  }

  /**
   * Build a user response DTO from a user entity
   */
  buildUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
