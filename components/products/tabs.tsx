"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePromise from "@/hooks/usePromise";
import { getAllProductsByCategory, getAllProductsCategories } from "@/services/products";
import { Category } from "@/types/categories";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import ProductsSkeleton from "./skeleton";

const ProductsTabs = () => {
    const [selectedTab, setSelectedTab] = useState<number | null>(null);

    const { data: categories = [], isLoading: isLoadingCategories } = usePromise<Pick<Category, "id" | "name">[]>(getAllProductsCategories.bind(this), { enabled: true });
    const { data: products = [], isLoading: isLoadingProducts } = usePromise<Product[]>(getAllProductsByCategory.bind(this, selectedTab!), {
        enabled: !!selectedTab,
        deps: [selectedTab],
    });

    useEffect(() => {
        if (!categories.length) {
            return;
        }

        setSelectedTab(categories[0]?.id);
    }, [categories]);

    return (
        <>
            {isLoadingCategories && <Skeleton className="w-full h-10 rounded-xl mb-6" />}
            {Boolean(categories.length) && (
                <Tabs defaultValue={`${categories[0]?.id}`}>
                    <TabsList className="flex w-full mb-6">
                        {categories.map((category) => (
                            <TabsTrigger
                                onClick={setSelectedTab.bind(this, category.id)}
                                className="flex-1 cursor-pointer"
                                defaultChecked={category.id === selectedTab}
                                key={category.id}
                                value={`${category.id}`}
                            >
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {isLoadingProducts && <ProductsSkeleton />}
                    {!isLoadingProducts &&
                        products.map((product) => (
                            <TabsContent key={product.id} defaultChecked={true} value={`${selectedTab}`}>
                                {product.name}
                            </TabsContent>
                        ))}
                </Tabs>
            )}
            {!isLoadingCategories && !Boolean(categories.length) && <p>Não há nenhum produto cadastrado no momento.</p>}
        </>
    );
};

export default ProductsTabs;
