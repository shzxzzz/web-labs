export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    isFavorite: boolean;
    isInCart: boolean;
    quantity: number;
    isSelected?: boolean;
}

export type Page = 'home' | 'cart';
export type DisplayMode = 'home' | 'search' | 'favorites';