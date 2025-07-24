'use client';

import {
  Landmark,
  Mountain,
  ScrollText,
  Newspaper,
  Video,
  Camera,
  Music,
  Bell,
} from 'lucide-react';

const categories = [
  { label: 'Mt. Kailash Yatra', icon: <ScrollText size={34} /> },
  { label: 'Adi Kailash', icon: <Mountain size={34} /> },
  { label: 'Pilgrimage Tour', icon: <Landmark size={34} /> },
  { label: 'Our Blogs', icon: <Newspaper size={34} /> },
  { label: 'Video Gallery', icon: <Video size={34} /> },
  { label: 'Photo Gallery', icon: <Camera size={34} /> },
  { label: 'Bhajan', icon: <Music size={34} /> },
  { label: 'Temple News', icon: <Bell size={34} /> },
];

export default function CategoryGrid() {
  return (
    <>
    {/* <div className='text-center'>
    <h3 className='font-semibold text-gray-600 my-3 text-2xl'>Popular Places</h3>
    <img src="/lines.webp" className='display-block mx-auto mb-3'  />
    </div> */}
    <div className="grid grid-cols-4 gap-2 px-2 dark:bg-gray-900 py-5">
      {categories.map((item, index) => (
        <div key={index} className="flex flex-col mb-3 items-center">
          <div className="p-5 border border-red-500 dark:border-gray-500 rounded-xl text-red-700 dark:text-gray-200 shadow-sm bg-white dark:bg-gray-700">
            {item.icon}
          </div>
          <span className="text-xs text-center mt-2 text-gray-600 dark:text-white ">
            {item.label}
          </span>
        </div>
      ))}

      <div className="col-span-2">
        <button className="w-full bg-red-700 dark:bg-gray-600 text-white py-3 rounded-sm shadow font-medium text-sm">
          Live Darshan
        </button>
      </div>
      <div className="col-span-2">
        <button className="w-full bg-red-700 dark:bg-gray-600 text-white py-3 rounded-sm shadow font-medium text-sm">
          Horoscope
        </button>
      </div>
    </div>
    </>
  );
}
