import { Injectable, LoggerService as NestLoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(private configService: ConfigService) {}

  log(message: any, context?: string) {
    console.log(`[${context || "Application"}] ${message}`);
  }

  error(message: any, trace?: string, context?: string) {
    console.error(`[${context || "Application"}] ${message}`, trace);
  }

  warn(message: any, context?: string) {
    console.warn(`[${context || "Application"}] ${message}`);
  }

  debug(message: any, context?: string) {
    if (this.configService.get("NODE_ENV") !== "production") {
      console.debug(`[${context || "Application"}] ${message}`);
    }
  }

  verbose(message: any, context?: string) {
    if (this.configService.get("NODE_ENV") !== "production") {
      console.log(`[${context || "Application"}] ${message}`);
    }
  }
}
