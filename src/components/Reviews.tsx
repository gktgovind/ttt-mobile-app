import * as React from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getHomeTextReviews, getReviewOneRoutes } from "@/utils/api/Httproutes";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { toast } from 'react-toastify';
import ReviewsDetails from '../components/ReviewDetails';
import { useDispatch } from 'react-redux';

const Reviews: any = () => {
    const dispatch = useDispatch();
    const [reviewsList, setreviewsList] = useState<any>([]);
    const [openReview, setOpenReviewDetails] = useState(false);
    const [ReviewDetails, setReviewsDetails] = useState<any>({});
    const onCloseReviewsModal = () => { setOpenReviewDetails(false) }
    const ViewReviews = (id: string) => {
        getReviewOneData(id)

    }
    const getReviewOneData = async (id: any) => {
        setReviewsDetails({});

        const userTravellerCall = await getReviewOneRoutes(id)
            .then((response: any) => {
                if (response.status === 200) {
                    setReviewsDetails(response.data);
                    setOpenReviewDetails(true)
                }
            })
            .catch((error: any) => {
                toast.error(error);
            })
    }

    const getHomeReviews = async () => {
        const HomeReviewsCall = await getHomeTextReviews()
            .then((response: any) => {
                if (response.status === 200) {
                    setreviewsList(response.data);
                }
            })
            .catch((error) => {
                // handle error if needed
            })
    }

    useEffect(() => {
        getHomeReviews()
    }, []);

    return (
        <>
            {reviewsList != null && reviewsList?.length > 0 ? (
                <div className="home-reviews py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3">We Appreciate Our Customers Feedbacks!</h2>
                            <span className="block w-20 h-1 bg-red-600 mx-auto rounded"></span>
                        </div>
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
                            {reviewsList?.map((reviewsItems: any, index: number) => (
                                <SwiperSlide className="mb-12 mt-3" key={`r${index}`}>
                                    <div
                                        className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 cursor-pointer"
                                        onClick={() => ViewReviews(reviewsItems._id)}
                                    >
                                        <div className="flex items-center space-x-6">
                                            <div className="w-20 h-20 flex-shrink-0">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${reviewsItems?.images[0].image ?? ""}?tr=f-webp`}
                                                    alt={reviewsItems?.title ?? ""}
                                                    title={reviewsItems?.title ?? ""}
                                                    width={80}
                                                    height={80}
                                                    quality={80}
                                                    className="w-full h-full rounded-full object-cover shadow-md"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="line-clamp-1 font-semibold text-gray-800">
                                                    {reviewsItems.title}
                                                    <span className="block text-sm text-gray-500">{reviewsItems.createdBy}</span>
                                                </h4>
                                                <div className="mt-2">
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/star.webp`}
                                                        width={95}
                                                        height={15}
                                                        alt="star"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-sm mt-4 text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: reviewsItems?.comment ?? "" }}></div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            ) : (
                <></>
            )}

            <ReviewsDetails
                reviewDetails={ReviewDetails}
                open={openReview}
                onCloseModal={onCloseReviewsModal}
            />
        </>
    )
}

export default Reviews;
