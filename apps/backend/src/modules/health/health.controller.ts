import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator,
} from "@nestjs/terminus";

import { Public } from "../auth/decorators/public.decorator";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private mongooseHealth: MongooseHealthIndicator
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  @ApiOperation({ summary: "Check API health status" })
  check() {
    return this.health.check([
      // Mongoose health check
      () => this.mongooseHealth.pingCheck("database"),
    ]);
  }
}
