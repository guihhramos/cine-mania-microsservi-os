/* CineMania - Serviços de API Integrados ao Gateway */

import axios from 'axios';
import type { Movie, Session, Booking, User, Ticket, Review, PaymentMethod } from '@/types';

// Alterado para apontar para a porta 8081 do API Gateway do Spring Boot
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* Interceptor para adicionar token de autenticação */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* MOVIES (cinema-catalog-service via Gateway) */
export const movieService = {
  getAll: (filters?: { genre?: string; classification?: string; year?: number; inTheaters?: boolean; upcoming?: boolean; sort?: string }) =>
    api.get<Movie[]>('/api/movies', { params: filters }), // Adicionado /api exigido pelo predicado do Gateway
  
  getById: (id: string) =>
    api.get<Movie>(`/api/movies/${id}`),
  
  search: (query: string) =>
    api.get<Movie[]>('/api/movies/search', { params: { q: query } }),
  
  create: (movie: Omit<Movie, 'id'>) =>
    api.post<Movie>('/api/movies', movie),
  
  update: (id: string, movie: Partial<Movie>) =>
    api.put<Movie>(`/api/movies/${id}`, movie),
  
  delete: (id: string) =>
    api.delete(`/api/movies/${id}`),
};

/* SESSIONS (cinema-catalog-service via Gateway) */
export const sessionService = {
  getByMovie: (movieId: string, filters?: { date?: string; room?: string }) =>
    api.get<Session[]>(`/api/movies/${movieId}/sessions`, { params: filters }),
  
  getAll: (filters?: { date?: string; room?: string }) =>
    api.get<Session[]>('/api/sessions', { params: filters }),
  
  getById: (id: string) =>
    api.get<Session>(`/api/sessions/${id}`),
  
  create: (session: Omit<Session, 'id'>) =>
    api.post<Session>('/api/sessions', session),
  
  update: (id: string, session: Partial<Session>) =>
    api.put<Session>(`/api/sessions/${id}`, session),
  
  delete: (id: string) =>
    api.delete(`/api/sessions/${id}`),
};

/* BOOKINGS (ticket-booking-service via Gateway) */
export const bookingService = {
  getAll: (filters?: { status?: string; userId?: string }) =>
    api.get<Booking[]>('/api/bookings', { params: filters }),
  
  getById: (id: string) =>
    api.get<Booking>(`/api/bookings/${id}`),
  
  // Rota corrigida para /api/bookings para bater certinho no predicado do Gateway
  create: (booking: Omit<Booking, 'id' | 'createdAt'>) =>
    api.post<Booking>('/api/bookings', booking), 
  
  update: (id: string, booking: Partial<Booking>) =>
    api.put<Booking>(`/api/bookings/${id}`, booking),
  
  cancel: (id: string) =>
    api.delete(`/api/bookings/${id}`),
};

/* TICKETS */
export const ticketService = {
  getByUser: (userId: string) =>
    api.get<Ticket[]>(`/api/users/${userId}/tickets`),
  
  getById: (id: string) =>
    api.get<Ticket>(`/api/tickets/${id}`),
  
  downloadPDF: (id: string) =>
    api.get(`/api/tickets/${id}/pdf`, { responseType: 'blob' }),
  
  share: (id: string) =>
    api.post(`/api/tickets/${id}/share`),
};

/* REVIEWS */
export const reviewService = {
  getByMovie: (movieId: string) =>
    api.get<Review[]>(`/api/movies/${movieId}/reviews`),
  
  create: (review: Omit<Review, 'id' | 'createdAt'>) =>
    api.post<Review>('/api/reviews', review),
  
  update: (id: string, review: Partial<Review>) =>
    api.put<Review>(`/api/reviews/${id}`, review),
  
  delete: (id: string) =>
    api.delete(`/api/reviews/${id}`),
};

/* PAYMENTS */
export const paymentService = {
  processPayment: (bookingId: string, method: PaymentMethod, amount: number) =>
    api.post('/api/payments', { bookingId, method, amount }),
  
  getPaymentMethods: () =>
    api.get('/api/payment-methods'),
};

/* USERS */
export const userService = {
  getProfile: () =>
    api.get<User>('/api/users/profile'),
  
  updateProfile: (user: Partial<User>) =>
    api.put<User>('/api/users/profile', user),
  
  getAll: () =>
    api.get<User[]>('/api/users'),
  
  getById: (id: string) =>
    api.get<User>(`/api/users/${id}`),
};

/* AUTHENTICATION */
export const authService = {
  login: (email: string, password: string) =>
    api.post<{ token: string; user: User }>('/api/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post<{ token: string; user: User }>('/api/auth/register', { name, email, password }),
  
  logout: () =>
    api.post('/api/auth/logout'),
  
  loginWithGoogle: (token: string) =>
    api.post<{ token: string; user: User }>('/api/auth/google', { token }),
  
  loginWithGitHub: (code: string) =>
    api.post<{ token: string; user: User }>('/api/auth/github', { code }),
};

/* ADMIN - DASHBOARD */
export const adminService = {
  getDashboardStats: () =>
    api.get('/api/admin/dashboard/stats'),
  
  getBookingsByDay: (days?: number) =>
    api.get('/api/admin/dashboard/bookings-by-day', { params: { days } }),
  
  getPopularMovies: () =>
    api.get('/api/admin/dashboard/popular-movies'),
  
  getRoomOccupancy: () =>
    api.get('/api/admin/dashboard/room-occupancy'),
};

export default api;