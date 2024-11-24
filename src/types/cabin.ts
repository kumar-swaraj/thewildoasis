export interface ICabin {
  _id: string;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export type CapacityFilter = 'all' | 'small' | 'medium' | 'large';
