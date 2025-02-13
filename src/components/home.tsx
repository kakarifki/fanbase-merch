// components/Home.tsx
// import { } from 'react';
import { Link } from 'react-router';
import HomePageTitle from './HomePageTitle';
import ProductCarousel from './ProductCarousel';
import { useProducts } from "@/hooks/use-product";
import { Button } from './ui/button';

const Home = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error: {(error as Error).message}</p>;
  }

  return (
    <div>
      <HomePageTitle />
      {products && products.length > 0 ? (
        <ProductCarousel slides={products} />
      ) : (
        <p>No Featured Product</p>
      )}
      <div className="text-center mt-8">
        <Link to='/product'>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">
            Show all Merch
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
