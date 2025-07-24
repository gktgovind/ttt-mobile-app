// components/Banner.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Image from 'next/image';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const banners = [
    {
        id: 1,

        image: 'https://cdn.triptotemples.com/banner/kailash-mansarovar-banner-680b39006b2d44bb98817843-20026734.webp?tr=w-600',
        title: 'Kailash Mansarovar Yatra',
    },
    {
        id: 2,
        image: 'https://cdn.triptotemples.com/banner/adi-kailash-banner-680b248e6b2d44bb98816db6-20071304.webp?tr=w-600',
        title: 'Adi Kailash Yatra',
    },
    {
        id: 3,
        image: 'https://cdn.triptotemples.com/banner/itcx-banner-680b39196b2d44bb98817850-40821606.webp?tr=w-600',
        title: 'Adi Kailash Yatra',
    },
    {
        id: 4,
        image: 'https://cdn.triptotemples.com/banner/mi-17-banner-680b7c21583394e49313f061-95472185.webp?tr=w-600',
        title: 'Char Dham Yatra',
    },
    {
        id: 5,
        image: 'https://cdn.triptotemples.com/banner/67addf80eba110aae31192df-et-award-ttt-banner-mobile.jpg?tr=w-600',
        title: 'Char Dham Yatra',
    },

];

export default function Banner() {
    return (
        <div className="w-full relative overflow-hidden dark:bg-gray-900">
            <Swiper
                slidesPerView={1}
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={false}
                autoplay={{ delay: 3000 }}
                loop={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="w-full custom-swiper"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="relative w-full ">
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                width={600} // or auto-define
                                height={300} // adjust based on design
                                className="w-full h-auto p-1 rounded-2xl object-cover"
                                priority

                            />

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
