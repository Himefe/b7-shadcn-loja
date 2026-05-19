import { apiFetch } from "@/lib/api";
import { Category } from "@/types/categories";
import { Product } from "@/types/product";

export const getAllProductsCategories = async () => {
    return apiFetch<Pick<Category, "id" | "name">[]>("/products/categories");
};

export const getAllProductsByCategory = async (categoryId: number) => {
    return apiFetch<Product[]>(`/products/categories/${categoryId}`);
};
