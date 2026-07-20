import { apiFetch } from "@/lib/api";
import { Category } from "@/types/categories";

export const getCategories = async (filter?: string) => {
    return apiFetch<Pick<Category, "id" | "name">[]>(`/categories${filter}`);
};
