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
      <Link to='/product'>
      <Button>
        Show all Merch
      </Button>
      </Link>
    </div>
  );
};

export default Home;
