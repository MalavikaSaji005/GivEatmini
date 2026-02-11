export type FoodItem = {
  id: number;
  name: string;
  type: 'Free' | 'Paid';
  expiry: string;
  location: string;
  imageUrl: string;
  description: string;
  rating?: number;
  price?: number;
};

export type CommunityMember = {
  id: number;
  name: string;
  role: 'NGO' | 'Shelter' | 'Volunteer';
  location: string;
  avatarUrl: string;
};
