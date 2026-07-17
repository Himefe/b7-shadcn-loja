import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";

export const getProducts = async (filter?: string) => {
    return apiFetch<Product[]>(`/products${filter}`);
};
