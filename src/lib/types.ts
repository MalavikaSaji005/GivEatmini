export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export type FoodItem = {
  id: number;
  name: string;
  description: string;
  allergens: string;
  location: string;
  expiryDate: string;
  imageUrl: string;
  type: string;   // 👈 ADD THIS
  price?: number;
};
