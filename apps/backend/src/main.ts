import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Request, Response } from "express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // API prefix
  app.setGlobalPrefix("api", {
    exclude: ["/api/docs", "/api/docs-json"],
  });

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle("Enterprise Monorepo API")
    .setDescription("RESTful API documentation for the Enterprise Monorepo")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Create custom route to serve Swagger JSON
  app.getHttpAdapter().get("/api/docs-json", (req: Request, res: Response) => {
    res.json(document);
  });

  // Create custom route for Swagger UI HTML
  app.getHttpAdapter().get("/api/docs", (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Enterprise Monorepo API</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui.css" />
        <style>
          body { margin: 0; padding: 0; }
          .topbar { display: none; }
        </style>
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist@4.5.0/swagger-ui-bundle.js"></script>
        <script>
          window.onload = () => {
            window.ui = SwaggerUIBundle({
              url: '/api/docs-json',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIBundle.SwaggerUIStandalonePreset
              ],
              layout: "BaseLayout",
              persistAuthorization: true,
            });
          };
        </script>
      </body>
      </html>
    `);
  });

  // Security
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "https://unpkg.com"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "https://unpkg.com",
          ],
          styleSrc: ["'self'", "'unsafe-inline'", "https://unpkg.com"],
          imgSrc: ["'self'", "data:"],
          connectSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false,
    })
  );
  app.enableCors();

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Start the server
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger documentation: http://localhost:${port}/api/docs`);
}

bootstrap();
