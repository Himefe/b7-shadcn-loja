import ProductsTabs from "@/components/products/tabs";
import ProductsTabSkeleton from "@/components/products/tabs/skeleton";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="mx-3">
            <Suspense fallback={<ProductsTabSkeleton />}>
                <ProductsTabs />
            </Suspense>
        </div>
    );
}
