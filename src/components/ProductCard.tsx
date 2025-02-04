import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  name: string;
  imageUrl: string;
  price: number;
}

const ProductCard = ({ name, imageUrl, price }: ProductCardProps) => {
  return (
    <Card className="w-full max-w-sm">
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