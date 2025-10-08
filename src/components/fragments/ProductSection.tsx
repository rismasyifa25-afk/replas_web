import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Grid } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/grid"

import { Button } from "@/components/ui/button"
import Card from "@/components/fragments/Card"
import { useId } from "react"

interface Product {
  id: number
  image: string
  title: string
  price: string
}

interface ProductSectionProps {
  title: string
  products: Product[]
  rows?: number // jumlah baris grid swiper, default 2
}


function ProductSection({ title, products, rows = 2 }: ProductSectionProps) {
  // Unique ID supaya tombol dan pagination beda tiap section
  const uniqueId = useId()
  const paginationId = `swiper-pagination-${uniqueId}`

  return (
    <div className="mb-12 xl:mx-0 mx-12">
      {/* Section Title */}
      <div className="mt-8 mb-6 flex justify-between items-center">
        <h2 className="text-[35px] font-bold">{title}</h2>
        <Button variant="outline" size="sm" className="rounded-md bg-transparent">
          More
        </Button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-row mb-6 gap-4">
        {["All", "Popular", "New"].map((label) => (
          <Button key={label} variant="outline" size="sm" className="rounded-md bg-transparent">
            {label}
          </Button>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Swiper tanpa tombol panah */}
        <Swiper
          modules={[Pagination, Grid]}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
          grid={{ rows, fill: "row" }}
          speed={700}
          pagination={{
            clickable: true,
            el: `#${paginationId}`,
            renderBullet: (index, className) => {
              return `
                <span 
                  class="${className} !w-8 !h-2 !rounded mx-1 transition-all duration-300 bg-gray-300"
                  style="background-color: var(--bullet-color-${index}, #CD242C);"
                ></span>
              `;
            },
          }}
          className="w-full"
          breakpoints={{
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              grid: { rows },
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              grid: { rows },
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              grid: { rows },
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination Dots */}
      <div
        id={paginationId}
        className="custom-pagination flex justify-center mt-6"
      ></div>
    </div>
  )
}

export default ProductSection;