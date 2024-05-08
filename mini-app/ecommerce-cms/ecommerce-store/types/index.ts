export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Product {
  id: string;
  name: string;
  price: number;

  isFeatured: Boolean;
  isArchived: Boolean;

  images: ProductImage[];

  category: Category;
  color: Color;
  size: Color;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}
