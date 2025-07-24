"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";

const mobilevideolist = [
    {
        title: "Kailash Aerial Darshan !",
        videourl:
            "https://yatra.triptotemples.com/mount-kailash-aerial-darshan/images/FILM%202-030824%20HIGHRES-Mobile.mp4",
        image: "/video1.jpg",
    },
    {
        title: "Nepal nahi dekha ?",
        videourl:
            "https://triptotemples.s3.ap-south-1.amazonaws.com/ulka-gupta-mobile.mp4",
        image: "/video2.jpg",
    },
    {
        title: "Rah gaye sab Dham !",
        videourl:
            "https://triptotemples.s3.ap-south-1.amazonaws.com/anang_desai_mobile.mp4",
        image: "/video3.jpg",
    },
];

export default function VideoSlider() {
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    return (
        <div className="w-full relative p-3 pb-5 overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Swiper
                slidesPerView={1.3}
                spaceBetween={10}
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={false}
                loop={false}
                modules={[Pagination]}
                className="w-full custom-swiper"
            >
                {mobilevideolist.map((video, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-[470px] sm:h-[900px] rounded-xl overflow-hidden bg-white shadow-md dark:bg-gray-800">
                            <div className="relative w-full h-[460px] sm:h-[400px]">
                                <div className="p-3">
                                    <p className="text-sm font-semibold text-center text-gray-600 dark:text-white">
                                        {video.title}
                                    </p>
                                </div>
                                {playingIndex === index ? (
                                    <video
                                        controls
                                        autoPlay
                                        muted
                                        className="w-full h-full object-cover"
                                        onEnded={() => setPlayingIndex(null)}
                                    >
                                        <source src={video.videourl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <button
                                        onClick={() => setPlayingIndex(index)}
                                        className="w-full h-full relative"
                                    >
                                        <Image
                                            src={video.image}
                                            alt={video.title}
                                            width={640}
                                            height={360}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-3xl">
                                            <Image src="/play.png"
                                            width={100}
                                            height={100}
                                            alt={"Play"}

                                            />
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
