import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router';

interface ProductCardProps {
  code: string;
  name: string;
  imageUrl: string;
  price: number;
}



const ProductCard = ({ name, imageUrl, price, code }: ProductCardProps) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleClick = () => {
    navigate(`/product/${code}`); // Navigasi ke halaman detail product
  };


  return (
    <Card onClick={handleClick} className="w-full max-w-sm cursor-pointer"> {/* Tambahkan onClick dan cursor-pointer */}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-auto rounded-lg"
        />
      </CardContent>
      <CardFooter>
        <CardDescription>Price: {price}</CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;