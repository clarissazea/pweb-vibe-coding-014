

import apiClient from './apiClient';
// The named import now successfully finds the export in '../types/auth'
import type { AuthResponse } from '../types/auth';

export const registerUser = async (data: { email: string; password: string }): Promise<{ msg: string }> => {
  const res = await apiClient.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }): Promise<AuthResponse> => {
  const res = await apiClient.post('/auth/login', data);
  return res.data;
};

// Remove the redundant type definitions from this file!
// export interface User { ... }
// export interface AuthResponse { ... }