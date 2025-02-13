import { useProducts } from "@/hooks/use-product";
import ProductCard from "@/components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const { data: products, isLoading, isError, error } = useProducts(searchTerm);

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 bg-gray-50">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Product List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-red-500 text-xl">Error: {(error as Error).message}</p>
            </div>
        );
    }

    if (products && products.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <p className="text-gray-600 text-xl">
                    No products found {searchTerm && `for "${searchTerm}"`}
                </p>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4 bg-gray-50"
        >
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
                JKT48 Fanbase Merch
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                    <ProductCard
                        key={product.code}
                        code={product.code}
                        name={product.name}
                        imageUrl={product.imageUrl || ''}
                        price={product.price}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default ProductList;
