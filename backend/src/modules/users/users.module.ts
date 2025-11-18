import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { SeedService } from './services/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, SeedService],
  controllers: [UsersController],
  exports: [UsersService, SeedService, TypeOrmModule],
})
export class UsersModule {}
