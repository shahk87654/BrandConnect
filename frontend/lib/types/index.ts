export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'brand' | 'influencer';
  avatar?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency: 'GBP' | 'USD';
  status: 'draft' | 'active' | 'closed' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Offer {
  id: string;
  campaignId: string;
  influencerId: string;
  amount: number;
  status: 'pending' | 'accepted' | 'rejected' | 'counter';
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error: string;
}
