export type FoodUnit = 'pcs' | 'kg' | 'liter' | 'box' | 'other';

export interface FoodItem {
  _id: string;
  name: string;
  quantity: number;
  expiryDate: string; // ISO string
  image?: string;     // path (e.g., /uploads/xxx.jpg)
  category?: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FoodFormInput {
  name: string;
  quantity: number;
  unit?: FoodUnit;     // UI-only unless you add to backend schema
  expiryDate: string;  // yyyy-mm-dd from <input type="date">
}

