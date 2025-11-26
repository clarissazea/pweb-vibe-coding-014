import apiClient from './apiClient';
import type { FoodItem, FoodFormInput } from '../types/food';

// ===========================
// GET ALL /foods
// ===========================
export const getFoodItems = async (): Promise<FoodItem[]> => {
  const res = await apiClient.get('/foods');
  return res.data;
};

// ===========================
// GET /foods/:id
// ===========================
export const getFoodItemById = async (id: string): Promise<FoodItem> => {
  const res = await apiClient.get(`/foods/${id}`);
  return res.data;
};

// ===========================
// CREATE POST /foods
// ===========================
export const createFoodItem = async (
  data: FoodFormInput,
  file: File | null
): Promise<FoodItem> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('quantity', String(data.quantity));
  formData.append('expiryDate', data.expiryDate);

  if (file) formData.append('image', file);

  const res = await apiClient.post('/foods', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

// ===========================
// UPDATE PUT /foods/:id
// ===========================
export const updateFoodItem = async (
  id: string,
  data: FoodFormInput,
  file: File | null
): Promise<FoodItem> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('quantity', String(data.quantity));
  formData.append('expiryDate', data.expiryDate);

  if (file) formData.append('image', file);

  const res = await apiClient.put(`/foods/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

// ===========================
// DELETE /foods/:id
// ===========================
export const deleteFoodItem = async (id: string): Promise<{ message: string }> => {
  const res = await apiClient.delete(`/foods/${id}`);
  return res.data;
};

export const getExpiringSoon = async (): Promise<FoodItem[]> => {
  const res = await apiClient.get('/foods/expired-soon');
  return res.data;
};