import Image from "next/image";
import Banner from '@/components/Banner';
import CategoryGrid from "@/components/CategoryGrid";
import VideoSlider from "@/components/HomeVideoSlider";
import { getHomePageData } from "@/utils/api/Httproutes";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import "swiper/css/effect-cards";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import { getLowestEMI } from "@/utils/emiCalculator";
import HelpAssistant from '@/components/HelpAssistant'
import { useState } from "react";

export default function Home(props: any) {
  const tabsData = props?.HomePageData?.response?.filter((item: { listType: string; }) => item.listType === "package");
  const [activeTab, setActiveTab] = useState(tabsData?.[1]?.title || "");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const customTitles = [
    { title: "Kailash Yatra", icon: "🕉️" },
    { title: "Char Dham", icon: "🔱" },
    { title: "Adi Kailash", icon: "🏔️" },
    { title: "Nepal", icon: "🇳🇵" },
    { title: "Varanasi", icon: "🛶" },
  ];
  const mobilevideolist = [
    {
      title: "New Age Sharvan Kumar",
      desc: "तुझे हंसाऊं, तुझे ही सताऊं! कितने करीब हैं मां, तुझे कैसे मैं बताऊं! मेरा वजूद है तुझ ही से, कैसे मैं जताऊं! चल मां, तुझे सब तीरथ कराऊं...",
      videourl:
        "https://triptotemples.s3.ap-south-1.amazonaws.com/MaiBhiShravanKumarSmall.mp4",
      image: "/video4.jpg",
    },
  ];

  return (

    <div className="font-sans ">
      <main className="dark:bg-gray-900">
        <Banner />
        <CategoryGrid />
        <div className="bg-trending"
        >
          <h1 className="font-semibold text-center text-xl text-white pt-3 mb-2 pt-5"><Image src="/trending-head.png" className="w-60 mx-auto"  alt="Bottom Nav Design"
  width={500}
  height={40} /></h1>
          {props?.HomePageData?.response.slice(0, 1).map((HomeItems: any, index: number) => (
            <div className="" key={"home" + index}  >
              {HomeItems?.listType == 'package' ? (
                <>
                  <div className="p-3 border-b-2 border-white dark:border-gray-700 dark:bg-gray-800">

                    <Swiper
                      slidesPerView={1.8}
                      spaceBetween={10}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      navigation={false}
                      //autoplay={{ delay: 3000 }}
                      loop={false}
                      modules={[Pagination, Navigation]}
                      className="w-full custom-swiper"
                    >
                      {HomeItems?.packages?.map((pkg: any, index: number) => {
                        const amount = pkg?.prices?.isApplySeatOption
                          ? ((pkg?.prices?.packagePrice?.[0]?.inrPrice || 0) +
                            (pkg?.prices?.packagePrice?.[0]?.passengerTypePrice?.[0]?.inrPrice || 0)) / 2
                          : pkg?.prices?.packagePrice?.[0]?.inrPrice || 0;

                        const { emi } = getLowestEMI(amount);
                        const link = `/${pkg.ID === "677cbbdf48ea290692747ace"
                          ? pkg.slug
                          : `${pkg.category?.[0]?.slug}/${pkg.slug}`}`;

                        return (
                          <SwiperSlide key={index}>
                            <div className="rounded-xl shadow-md border dark:border-gray-500 overflow-hidden bg-white dark:bg-gray-700 relative w-full">
                              <a href={link} target="_blank" className="block relative">
                                {/* EMI / Registration Badge on top */}
                                {amount > 0 ? (
                                  <div className="absolute bottom-1 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs text-gray-800 shadow">
                                    EMI from <span className="text-blue-600 underline">₹{emi}</span>
                                  </div>
                                ) : pkg.ID === "677cbbdf48ea290692747ace" ? (
                                  <div className="absolute bottom-1 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs text-red-700 shadow">
                                    Registration Open
                                  </div>
                                ) : null}

                                <Image
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pkg.otherInfo?.appPortraitimage || pkg.image}?tr=w-360,h-270,f-webp`}
                                  alt={pkg.anotherTitle}
                                  width={360}
                                  height={270}
                                  className="w-full object-cover"
                                />
                              </a>

                              <div className="p-3">
                                <p style={{ minHeight: "40px" }} className="text-base line-clamp-2 text-sm font-semibold text-gray-700 dark:text-gray-100 mt-2">{pkg.anotherTitle}</p>

                                {pkg.duration && (
                                  <p className="text-base m-0">
                                    <small className="text-xs text-gray-500 dark:text-gray-400">({pkg.duration})</small>
                                  </p>
                                )}

                                <a href={link} target="_blank">
                                  <div className="mt-2 flex items-center justify-between text-red-800 dark:text-white py-2 rounded-full text-sm ">
                                    {pkg.ID === "677cbbdf48ea290692747ace" ? 'Register Now' : 'Explore'}
                                    <div className="text-red-800 dark:text-gray-400 ">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>

                        );
                      })}
                    </Swiper>

                  </div>

                </>
              ) : ""}




            </div>
          ))}
        </div>
        <div className="new-video">
          <div className="px-0 py-2 ">
            {mobilevideolist.map((video, index) => (
              <SwiperSlide key={index}>
                <div className="h-[340px] sm:h-[340px]  overflow-hidden">
                  <div className="p-2">
                    <p className="text-lg font-semibold text-center mb-2 text-white dark:text-white">
                      {video.title}
                    </p>
                    <p className="text-center font-medium text-[14.5px] mb-2 leading-6 text-white" >{video.desc}</p>
                  </div>
                  <div className="relative w-full h-[310px] ">
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
                          style={{ border: "1px solid #bd5562ff" }}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-3xl">
                          <Image src="/play.png"  alt="Bottom Nav Design"
  width={500}
  height={40} style={{ marginTop: "-100px", width: "40px" }} />
                        </div>
                      </button>
                    )}
                  </div>


                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
        <div className="px-0 py-5 bg-gray-100 dark:bg-gray-700" style={{ display: "block", marginTop: "-20px" }}>
          {/* Scrollable Tabs */}
          <div className=" p-2">
            <div className="flex overflow-x-auto bg-white rounded-xl  border border-2  scrollbar-hide">
              {tabsData.slice(1).map((item: any, index: number) => {
                const customTab = customTitles[index] || { title: item.title, icon: "🌍" };

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item.title)}
                    className={`whitespace-nowrap px-4 py-3 text-sm font-medium transition-all flex items-center gap-2
        ${activeTab === item.title
                        ? "bg-red-100 text-red-700 border border-red-700 dark:border-gray-700 rounded-xl"
                        : "bg-white text-gray-700 hover:bg-gray-200 border border-white"
                      }`}
                  >
                    {/* <span className="text-lg">{customTab.icon}</span> */}
                    <span>{customTab.title}</span>
                  </button>

                );
              })}

            </div>
          </div>

          {/* Active Tab Content */}
          {tabsData.map((HomeItems: any, index: number) => {
            if (HomeItems.title !== activeTab) return null;

            return (
              <div className="p-3 pb-0 dark:bg-gray-800" key={"home" + index}>
                <h1 className="font-semibold text-gray-600 dark:text-gray-100 mb-2 text-xl">{HomeItems.title}</h1>
                <div
                  className="leading-6 text-[15px] text-gray-600 dark:text-gray-400 line-clamp-3 mb-3 font-medium"
                  dangerouslySetInnerHTML={{ __html: HomeItems.description ?? "" }}
                ></div>

                <Swiper
                  slidesPerView={1.8}
                  spaceBetween={10}
                  pagination={{ dynamicBullets: true }}
                  navigation={false}
                  loop={false}
                  modules={[Pagination, Navigation]}
                  className="w-full custom-swiper"
                >
                  {HomeItems.packages?.map((pkg: any, index: number) => {
                    const amount = pkg?.prices?.isApplySeatOption
                      ? ((pkg?.prices?.packagePrice?.[0]?.inrPrice || 0) +
                        (pkg?.prices?.packagePrice?.[0]?.passengerTypePrice?.[0]?.inrPrice || 0)) / 2
                      : pkg?.prices?.packagePrice?.[0]?.inrPrice || 0;

                    const { emi } = getLowestEMI(amount);
                    const link = `/${pkg.ID === "677cbbdf48ea290692747ace"
                      ? pkg.slug
                      : `${pkg.category?.[0]?.slug}/${pkg.slug}`}`;

                    return (
                      <SwiperSlide key={index}>
                        <div className="rounded-xl shadow-md border dark:border-gray-500 overflow-hidden bg-white dark:bg-gray-700 relative w-full">
                          <a href={link} target="_blank" className="block relative">
                            {amount > 0 ? (
                              <div className="absolute bottom-1 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs text-gray-800 shadow">
                                EMI from <span className="text-blue-600 underline">₹{emi}</span>
                              </div>
                            ) : pkg.ID === "677cbbdf48ea290692747ace" ? (
                              <div className="absolute bottom-1 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs text-red-700 shadow">
                                Registration Open
                              </div>
                            ) : null}

                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pkg.otherInfo?.appPortraitimage || pkg.image}?tr=w-360,h-270,f-webp`}
                              alt={pkg.anotherTitle}
                              width={360}
                              height={270}
                              className="w-full object-cover"
                            />
                          </a>

                          <div className="p-3">
                            <p style={{ minHeight: "40px" }} className="text-base line-clamp-2 text-sm font-semibold text-gray-700 dark:text-gray-100 mt-2">
                              {pkg.anotherTitle}
                            </p>

                            {pkg.duration && (
                              <p className="text-base m-0">
                                <small className="text-xs text-gray-500 dark:text-gray-400">({pkg.duration})</small>
                              </p>
                            )}

                            <a href={link} target="_blank">
                              <div className="mt-2 flex items-center justify-between text-red-800 dark:text-white py-2 rounded-full text-sm">
                                {pkg.ID === "677cbbdf48ea290692747ace" ? 'Register Now' : 'Explore'}
                                <div className="text-red-800 dark:text-gray-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>


            );
          })}
        </div>

        <VideoSlider />
        {props?.HomePageData?.response.slice(6, 7).map((HomeItems: any, index: number) => (
          <div className="" key={"home" + index}  >
            {HomeItems?.listType == 'category' ? (
              <>
                <div className="new-cat" style={{ marginTop: "0px" }}>
                  <Image  alt="Bottom Nav Design"
  width={500}
  height={40} src="/explore.png" className="w-80 py-8 mx-auto" />
                  <div className="overflow-hidden px-5 mx-5 ">
                    <Swiper
                      effect="cards"
                      grabCursor={true}
                      modules={[EffectCards, Pagination, Navigation]}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      navigation={true}
                      loop={true}
                      className="w-full max-w-sm mx-auto my-6 mt-0 custom-swiper"
                    >
                      {HomeItems?.categories?.map((pkg: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="relative w-full h-[400px] sm:h-[460px] rounded-4xl overflow-hidden ">
                            <a href={pkg.slug} target="_blank" className="block w-full h-full">
                              <Image
                                src={`/${pkg?.titleForApp}.png`}
                                alt={pkg.anotherTitle}
                                width={600}
                                height={800}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute top-2 left-2 w-full  p-4">
                                <p className="text-3xl font-bold text-white line-clamp-2">{pkg.titleForApp}</p>
                                <span className="text-xs font-semibold text-gray-600 py-1 px-2 mt-3 rounded text-left bg-white/50">{pkg?.pckageMinPriceResult?.Count} Packages</span><br />
                                <span className="text-xs font-semibold text-gray-900 py-1 px-3 inline-block mt-2 rounded-full text-left bg-yellow-300">Rs. {pkg?.pckageMinPriceResult?.MinPrice}/- Onwards</span>
                              </div>
                              <div className="absolute text-xl flex items-center justify-between bottom-4 right-5 text-white">Explore
                                <div className="text-gray-900 border-1 border-white bg-yellow-300 rounded-full p-2 ms-2 text-center dark:text-gray-400">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>

                            </a>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                </div>

              </>
            ) : ""}




          </div>
        ))}
        {props?.HomePageData?.response.slice(7, 8).map((HomeItems: any, index: number) => (
          <div className="" key={"catn" + index}  >
            {HomeItems?.listType == 'category' ? (
              <>
                <div className="" >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Image  alt="Bottom Nav Design"
  width={500}
  height={40} src="/directional-sign.svg" className="w-8" />
                    <span className="font-bold text-xl text-gray-700 ">Trending Destinations</span>
                  </div>
                  <div className="overflow-hidden p-3">
                    <Swiper
                      slidesPerView={2.2}
                      spaceBetween={10}
                      modules={[Pagination, Navigation]}
                      pagination={{
                        dynamicBullets: true,
                      }}
                      navigation={true}
                      loop={true}
                      className="w-full custom-swiper"
                    >
                      {HomeItems?.categories?.map((pkg: any, index: number) => (
                        <SwiperSlide key={index}>
                          <div className="relative w-full   shadow-sm border border-red-200 rounded-xl overflow-hidden ">
                            <a href={pkg.slug} target="_blank" className="block w-full h-full">
                              <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pkg?.imageLanApp || pkg.image}?tr=w-360,h-360,f-webp`}
                                alt={pkg.anotherTitle}
                                width={600}
                                height={800}
                                className="w-full h-full object-cover   rounded-b-none"
                              />
                              <div className="absolute bottom-18 left-1 w-full p-1">
                                <span className="text-xs font-semibold text-white py-2 px-2 mt-3 rounded text-left bg-black/50">{pkg?.pckageMinPriceResult?.Count} Packages</span>
                              </div>
                              <p className="relative py-3 bg-red-100 px-2 text-sm font-semibold text-gray-900 overflow-hidden rounded-b-xl">


                                <span className="relative z-10 py-2">{pkg.titleForApp}

                                  <span className="block text-red-500">Explore</span>

                                </span>
                              </p>
                            </a>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                </div>

              </>
            ) : ""}




          </div>
        ))}
        <HelpAssistant />
      </main>

    </div>
  );
}
export async function getStaticProps() {
  try {
    const [homeResponse] = await Promise.all([
      getHomePageData(),
    ]);
    if (homeResponse.status === 200) {
      return {
        props: {
          HomePageData: {
            success: true,
            response: homeResponse.data,
            bannerData: {
              success: true,
              response: ""
            }
          }
        },
        revalidate: 300, // Set the revalidation time for ISR (in seconds)
      };
    } else {
      return {
        notFound: true
      };
    }
  } catch (error) {
    return {
      notFound: true
    };
  }
}
