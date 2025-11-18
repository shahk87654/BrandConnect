import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seed(): Promise<void> {
    // Check if data already exists
    const userCount = await this.usersRepository.count();
    if (userCount > 0) {
      console.log('Database already seeded. Skipping seed...');
      return;
    }

    console.log('🌱 Seeding database with sample data...');

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin@123', 10);
    const userPassword = await bcrypt.hash('user@123', 10);
    const brandPassword = await bcrypt.hash('brand@123', 10);

    // Create sample users
    const sampleUsers = [
      // Admin user
      {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@brandconnect.local',
        password: adminPassword,
        role: UserRole.ADMIN,
        emailVerified: true,
        isActive: true,
        bio: 'System Administrator',
        phoneNumber: '+1-555-0100',
        metadata: JSON.stringify({
          lastLogin: new Date().toISOString(),
          loginCount: 1,
        }),
      },
      // Regular user (Influencer)
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'influencer@brandconnect.local',
        password: userPassword,
        role: UserRole.INFLUENCER,
        emailVerified: true,
        isActive: true,
        bio: 'Lifestyle and fashion content creator with 250K followers',
        phoneNumber: '+1-555-0101',
        metadata: JSON.stringify({
          followers: 250000,
          engagementRate: 5.2,
          platforms: ['instagram', 'tiktok'],
          joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
        }),
      },
      // Brand user
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'brand@brandconnect.local',
        password: brandPassword,
        role: UserRole.BRAND,
        emailVerified: true,
        isActive: true,
        bio: 'Marketing Manager at TechStyle Co.',
        phoneNumber: '+1-555-0102',
        metadata: JSON.stringify({
          company: 'TechStyle Co.',
          industry: 'Fashion & Technology',
          companySite: 'https://techstyle.example.com',
          joinedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
          monthlyBudget: 50000,
        }),
      },
    ];

    // Insert users
    const users = this.usersRepository.create(sampleUsers);
    const result = await this.usersRepository.save(users);

    console.log(`✓ Created ${result.length} sample users:`);
    console.log(`  📧 Admin: admin@brandconnect.local / admin@123`);
    console.log(`  📧 Influencer: influencer@brandconnect.local / user@123`);
    console.log(`  📧 Brand: brand@brandconnect.local / brand@123`);
    console.log('');
    console.log('🎉 Database seeding complete!');
  }

  async clearUsers(): Promise<void> {
    await this.usersRepository.delete({});
    console.log('✓ Cleared all users');
  }
}
