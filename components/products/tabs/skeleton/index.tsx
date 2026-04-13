import { Skeleton } from "@/components/ui/skeleton";

const ProductsTabSkeleton = () => {
    return (
        <>
            <Skeleton className="w-full h-10 rounded-xl mb-6" />

            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`product-skeleton-${index}`}>
                        <Skeleton className="w-full h-32 rounded-xl" />
                        <Skeleton className="mt-2 w-full h-7 rounded-xl" />
                        <Skeleton className="mt-2 w-16 h-5 rounded-xl" />
                        <Skeleton className="mt-2 w-full h-9 rounded-xl" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductsTabSkeleton;
