export type Role = 'USER' | 'ADMIN' | 'MANAGER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string;
  bio?: string;
  location?: string;
  skills: string[];
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDesc: string;
  icon: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  features: string[];
  image?: string;
  isPopular: boolean;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  views: number;
  createdAt: string;
}

export interface AIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
