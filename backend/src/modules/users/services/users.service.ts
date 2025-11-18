import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'bio', 'phoneNumber', 'emailVerified', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'firstName', 'lastName', 'email', 'role', 'bio', 'phoneNumber', 'emailVerified', 'isActive', 'createdAt', 'updatedAt'],
    });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async update(id: string, userData: Partial<User>) {
    await this.usersRepository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: string) {
    await this.usersRepository.delete(id);
    return { success: true };
  }

  async getStats() {
    const total = await this.usersRepository.count();
    const admins = await this.usersRepository.countBy({ role: UserRole.ADMIN });
    const influencers = await this.usersRepository.countBy({ role: UserRole.INFLUENCER });
    const brands = await this.usersRepository.countBy({ role: UserRole.BRAND });

    return {
      total,
      byRole: {
        admin: admins,
        influencer: influencers,
        brand: brands,
      },
    };
  }
}
