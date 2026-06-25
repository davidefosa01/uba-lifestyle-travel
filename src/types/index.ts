export type UserRole = 'CUSTOMER' | 'MERCHANT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  flexPayEligible: boolean;
  balance: number;
}

export type ListingCategory = 'Hotels' | 'Short-lets' | 'Tours' | 'Resorts' | 'Events' | 'Sites' | 'Venues' | 'Organisers';

export interface Listing {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  category: ListingCategory;
  flexPayAvailable: boolean;
  instantBooking: boolean;
  merchantId: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'DECLINED' | 'PAID' | 'COMPLETED';

export interface Booking {
  id: string;
  listingId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  bookingReference: string;
  paymentPlan?: 'FULL' | 'FLEXPAY';
  flexPayTenor?: number;
  createdAt: string;
  expiresAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
}

export interface FlexPayDecision {
  status: 'APPROVED' | 'DECLINED';
  maxAmount?: number;
  interestRate: number;
}
