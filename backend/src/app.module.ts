import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

// Common
import { HealthController } from './common/controllers/health.controller';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { OffersModule } from './modules/campaigns/offers.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { KycModule } from './modules/kyc/kyc.module';
import { AdminModule } from './modules/admin/admin.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),

    // Database
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE === 'postgres' ? 'postgres' : 'better-sqlite3',
      ...(process.env.DATABASE_TYPE === 'postgres'
        ? {
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt(process.env.DATABASE_PORT || '5432', 10),
            username: process.env.DATABASE_USER || 'postgres',
            password: process.env.DATABASE_PASSWORD || 'postgres',
            database: process.env.DATABASE_NAME || 'brandconnect',
          }
        : {
            database: 'brandconnect.sqlite',
          }),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: process.env.DATABASE_LOGGING === 'true',
      maxQueryExecutionTime: 5000,
      retryAttempts: 5,
      retryDelay: 3000,
    }),

    // Scheduling
    ScheduleModule.forRoot(),

    // Feature modules
    AuthModule,
    UsersModule,
    CampaignsModule,
    OffersModule,
    PaymentsModule,
    MetricsModule,
    KycModule,
    AdminModule,
    DiscoveryModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
