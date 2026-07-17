export interface Category {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export enum CategoryTypes {
    PRODUCT = "PRODUCT",
}
