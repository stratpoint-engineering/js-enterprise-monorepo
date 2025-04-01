import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
// Make ThrottlerModule import optional to avoid build errors
// import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from "joi";

import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
// import { HealthModule } from "./modules/health/health.module";
import { LoggerModule } from "./modules/logger/logger.module";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid("development", "production", "test")
          .default("development"),
        PORT: Joi.number().default(3001),
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default("1h"),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default("7d"),
      }),
    }),

    // Database
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
    }),

    // Rate limiting - commented out to avoid build errors
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 100,
    // }),

    // Feature modules
    AuthModule,
    UsersModule,
    // HealthModule,
    LoggerModule,
  ],
})
export class AppModule {}
