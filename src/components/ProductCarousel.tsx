// components/ProductCarousel.tsx
// import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Product } from '@/types/product';

interface Props {
    slides: Product[]
}

const ProductCarousel = ({ slides }: Props) => {
    // const [autoplay, setAutoplay] = React.useState(true)
    // const autoplayOptions = {
    //     delay: 3000,
    //     stopOnInteraction: false,
    // }

    return (
        <Carousel
            orientation="horizontal"
            className="w-full max-w-md"
            plugins={[
                Autoplay({
                  delay: 2000,
                  stopOnInteraction: false,
                }),
              ]}
        >
            <CarouselContent className="w-full pb-5">
                {slides.slice(0, 5).map((slide, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <AspectRatio ratio={1 / 1} className="h-72">
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.name}
                                    // className="aspect-square h-full w-full rounded-md object-cover shadow-sm"
                                />
                            </AspectRatio>
                            <p className="text-sm mt-2">{slide.name}</p>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="h-8 w-8 top-1/2 -translate-y-1/2 left-2 shadow" />
            <CarouselNext className="h-8 w-8 top-1/2 -translate-y-1/2 right-2 shadow" />
        </Carousel>
    );
};

export default ProductCarousel;
