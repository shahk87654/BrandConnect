import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeedService } from './modules/users/services/seed.service';
import helmet from 'helmet';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Seed database with sample data
  const seedService = app.get(SeedService);
  await seedService.seed();

  // Security middleware
  app.use(helmet());

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Sentry initialization (optional, if enabled)
  if (process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.errorHandler());
  }

  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('BrandConnect API')
    .setDescription('Influencer Marketing Platform API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addTag('Campaigns', 'Campaign management')
    .addTag('Offers', 'Offer management')
    .addTag('Payments', 'Payment & escrow')
    .addTag('Metrics', 'Performance metrics')
    .addTag('Discovery', 'Influencer discovery')
    .addTag('Admin', 'Admin operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 BrandConnect API running on http://localhost:${port}`);
  console.log(`📚 API Docs available at http://localhost:${port}/api`);
}

bootstrap().catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
