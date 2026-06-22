import type { Listing } from '../types';

export const mockUsers = [
  {
    id: 'user-1',
    name: 'David Enabulele',
    email: 'david.e@uba.com',
    role: 'CUSTOMER' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
    flexPayEligible: true,
    balance: 2500000,
  },
  {
    id: 'merchant-1',
    name: 'Azure',
    email: 'admin@azuresanctuary.com',
    role: 'MERCHANT' as const,
    avatar: 'https://ui-avatars.com/api/?name=Azure+Sanctuary&background=ae0011&color=fff',
    flexPayEligible: false,
    balance: 5000000,
    reviews: [
        { user: 'Bisi A.', rating: 5, comment: 'Exceptional service and beautiful views!' },
        { user: 'Chidi O.', rating: 4, comment: 'Very professional staff. Highly recommended.' }
    ]
  },
  {
    id: 'merchant-2',
    name: 'Heritage Stays',
    email: 'info@heritagestays.com',
    role: 'MERCHANT' as const,
    avatar: 'https://ui-avatars.com/api/?name=Heritage+Stays&background=333&color=fff',
    flexPayEligible: false,
    balance: 1200000,
    reviews: [
        { user: 'Emeka N.', rating: 5, comment: 'The best tour experience in Lagos.' }
    ]
  },
  {
    id: 'admin-1',
    name: 'UBA Admin',
    email: 'admin@uba.com',
    role: 'ADMIN' as const,
    avatar: 'https://ui-avatars.com/api/?name=UBA+Admin&background=333&color=fff',
    flexPayEligible: false,
    balance: 0,
  },
];

export const mockListings: Listing[] = [
  // --- HOTELS ---
  {
    id: 'hotel-1',
    name: 'The Azure Sanctuary Resort',
    description: 'A luxury resort infinity pool overlooking a crystal clear turquoise ocean at sunset. Sharp architectural lines and premium service.',
    location: 'Victoria Island, Lagos',
    price: 145000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000',
    category: 'Hotels',
    flexPayAvailable: true,
    merchantId: 'merchant-1',
  },
  {
    id: 'hotel-2',
    name: 'Transcorp Hilton Abuja',
    description: 'The standard for luxury in the capital. Secure grounds and premium executive suites.',
    location: 'Maitama, Abuja',
    price: 120000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
    category: 'Hotels',
    flexPayAvailable: true,
    merchantId: 'merchant-1',
  },

  // --- SHORTLETS ---
  {
    id: 'shortlet-1',
    name: 'Ikoyi Zen Suite',
    description: 'Minimalist boutique shortlet with clean lines and natural oak furniture.',
    location: 'Ikoyi, Lagos',
    price: 85000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000',
    category: 'Short-lets',
    flexPayAvailable: true,
    merchantId: 'merchant-1',
  },

  // --- TOURS ---
  {
    id: 'tour-1',
    name: 'Obudu Mountain Package',
    description: 'Experience the clouds from your balcony in this premium mountain resort tour.',
    location: 'Cross River State',
    price: 265000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000',
    category: 'Tours',
    flexPayAvailable: true,
    merchantId: 'merchant-2',
  },

  // --- RESORTS ---
  {
    id: 'resort-1',
    name: 'La Campagne Tropicana',
    description: 'African themed forest, beach and lagoon resort. Experience nature in its purest form.',
    location: 'Ibeju-Lekki, Lagos',
    price: 95000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1000',
    category: 'Resorts',
    flexPayAvailable: true,
    merchantId: 'merchant-1',
  },

  // --- EVENTS ---
  {
    id: 'event-1',
    name: 'Gidi Culture Festival VIP',
    description: 'Multi-stage music festival celebrating the best of African talent. VIP access included.',
    location: 'Landmark Beach, Lagos',
    price: 75000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1000',
    category: 'Events',
    flexPayAvailable: true,
    merchantId: 'merchant-1',
  }
];
