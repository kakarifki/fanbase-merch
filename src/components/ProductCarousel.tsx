import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Product } from '@/types/product';
import { Link } from "react-router";

interface Props {
    slides: Product[]
}

const ProductCarousel = ({ slides }: Props) => {
    return (
        <div className="container mx-auto px-4">
            <Carousel
                orientation="horizontal"
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 2000,
                        stopOnInteraction: false,
                    }),
                ]}
            >
                <CarouselContent className="flex gap-4 pb-5">
                    {slides.slice(0, 5).map((slide, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <Link to={`/product/${slide.code}`} className="block group">
                                <div className="p-2 rounded-lg transition-transform transform group-hover:scale-105">
                                    <AspectRatio ratio={1 / 1} className="relative overflow-hidden rounded-lg shadow-md">
                                        <img
                                            src={slide.imageUrl}
                                            alt={slide.name}
                                            className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                                        />
                                    </AspectRatio>
                                    <p className="mt-2 text-center text-sm font-medium text-gray-800 group-hover:text-blue-600">
                                        {slide.name}
                                    </p>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="h-10 w-10 top-1/2 -translate-y-1/2 left-2 shadow bg-white/80 hover:bg-white" />
                <CarouselNext className="h-10 w-10 top-1/2 -translate-y-1/2 right-2 shadow bg-white/80 hover:bg-white" />
            </Carousel>
        </div>
    );
};

export default ProductCarousel;
