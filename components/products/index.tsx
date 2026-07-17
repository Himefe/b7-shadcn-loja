"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import usePromise from "@/hooks/usePromise";
import { getProducts } from "@/services/products";
import { Category, CategoryTypes } from "@/types/categories";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import ProductsSkeleton from "@/components/products/skeleton";
import ProductItem from "@/components/products/item";
import { getCategories } from "@/services/categories";
import qs from "qs";

const ProductsTabs = () => {
    const [selectedTab, setSelectedTab] = useState<number | null>(null);

    const { data: categories = [], isLoading: isLoadingCategories } = usePromise<Pick<Category, "id" | "name">[]>(
        getCategories.bind(this, qs.stringify({ filter: { type: [CategoryTypes.PRODUCT] } }, { addQueryPrefix: true })),
        { enabled: true },
    );
    const { data: products = [], isLoading: isLoadingProducts } = usePromise<Product[]>(
        getProducts.bind(this, qs.stringify({ filter: { categories: [selectedTab], isActive: true } }, { addQueryPrefix: true })!),
        {
            enabled: !!selectedTab,
            deps: [selectedTab],
        },
    );

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
                    {!isLoadingProducts && Boolean(products.length) && (
                        <TabsContent className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4" defaultChecked={true} value={`${selectedTab}`}>
                            {products.map((product) => (
                                <ProductItem key={product.id} item={product} />
                            ))}
                        </TabsContent>
                    )}
                </Tabs>
            )}
            {!isLoadingCategories && !Boolean(categories.length) && <p>Não há nenhum produto cadastrado no momento.</p>}
        </>
    );
};

export default ProductsTabs;
