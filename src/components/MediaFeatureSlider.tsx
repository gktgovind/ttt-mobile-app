import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

export default function MediaFeatureSlider() {
  return (
    <div className="bg-gray-100 py-5 mb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2">
          <h3 className="text-lg font-semibold text-gray-700">
            We Got Featured in the Media
          </h3>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={5000} // for smooth continuous scrolling
          slidesPerView={1.8}
          spaceBetween={5}
          className="media-swiper"
        >
          {[
            "indiatvnews.webp",
            "New-18-Hindi.webp",
            "timesofindia.webp",
            "newsvoir.webp",
            "theprint.webp",
            "ptinews.webp",
            "gnttv.webp",
            "dailyhunt.webp",
            "businessnewsthisweek.webp",
            "theweek.webp",
            "US_World_Today.webp",
            "aninews.webp",
            "dainik-jagran.webp",
            "amar-ujala.webp",
            "financialexpress.webp",
          ].map((img, index) => (
            <SwiperSlide key={index} className="w-auto">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/ImageManager/${img}`}
                alt={img.split(".")[0]}
                width={220}
                height={75}
                  style={{ clipPath: 'inset(4% 2% 4% 2%)' }} // crop 5% from all sides
                className="object-contain transition p-2 bg-white rounded-xl duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
