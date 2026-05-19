import ProductsTabs from "@/components/products/tabs";
import ProductsSkeleton from "@/components/products/skeleton";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="mx-3 flex-1">
            <Suspense fallback={<ProductsSkeleton />}>
                <ProductsTabs />
            </Suspense>
        </div>
    );
}
