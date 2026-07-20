export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
    category?: string;
    isActive: boolean;
    sku: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}
