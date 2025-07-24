import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ReviewsDetails = (props: any) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const closeLogin = () => {
    props.onCloseModal();
  };

  return (
    <>
      {props.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center md:justify-center">
          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`bg-white dark:bg-gray-900 shadow-2xl transform transition-all
              ${isMobile ? 'w-full rounded-t-2xl max-h-[95vh]' : 'w-full md:w-[420px] rounded-xl'}
            `}
          >
            {/* Close Button */}
            <button
              type="button"
              className="absolute right-4 top-4 z-10"
              onClick={closeLogin}
            >
              {/* <img src="/images/close.svg" alt="Close" className="w-5 h-5" /> */}
            </button>

            {/* Handle Bar for Mobile */}
            {isMobile && (
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-1" />
            )}

            {/* Modal Content */}
            <div className="p-5 pt-2">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                {props.reviewDetails.title}
              </h4>
              <span className="text-sm text-gray-500">{props.reviewDetails.createdBy}</span>

              <div className="mt-2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/star.webp`}
                  width={95}
                  height={15}
                  alt="star"
                />
              </div>

              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 overflow-y-auto max-h-[70vh] md:max-h-[65vh] pr-1">
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.reviewDetails?.comment ?? '',
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ReviewsDetails;
