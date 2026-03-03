'use client'

import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from '@/components/ui/carousel'

function PrevButton() {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return (
    <button
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-black drop-shadow disabled:opacity-30 select-none"
    >
      {'<'}
    </button>
  )
}

function NextButton() {
  const { scrollNext, canScrollNext } = useCarousel()
  return (
    <button
      onClick={scrollNext}
      disabled={!canScrollNext}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-black drop-shadow disabled:opacity-30 select-none"
    >
      {'>'}
    </button>
  )
}

interface ProductImage {
  url: string
  alt: string
}

interface ProductImageCarouselProps {
  images: ProductImage[]
}

export const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  if (images.length === 0) return null

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-square bg-gray-100">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <PrevButton />
          <NextButton />
        </>
      )}
    </Carousel>
  )
}
