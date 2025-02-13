import React from 'react';
import { Link } from 'react-router-dom';
import { 
  // Heart, 
  ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    code: string;
    name: string;
    imageUrl: string;
    price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ code, name, imageUrl, price }) => {
    // Format price in IDR
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
            <div className="relative overflow-hidden">
                <img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white/70 rounded-full hover:bg-white/90"
                > */}
                    {/* <Heart className="w-5 h-5 text-red-500" /> */}
                {/* </Button> */}
                
            </div>
            
            <CardContent className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {name}
                </h3>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <span className="text-xl font-bold text-primary">
                    {formattedPrice}
                </span>
                <Link to={`/product/${code}`}>
                    <Button variant="outline" size="sm">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;