'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, User, Settings, LogOut, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import MediaFeatureSlider from './MediaFeatureSlider';
import MobileFooterAccordion from './MobileFooterAccordion';
import Reviews from './Reviews';
import Image from 'next/image';
export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: 'Home', icon: <Home size={22} />, href: '/' },
    { label: 'Profile', icon: <User size={22} />, href: '/profile' },
    { label: 'Settings', icon: <Settings size={22} />, href: '/settings' },
    { label: 'Logout', icon: <LogOut size={22} />, href: '/logout' },
  ];

  const handleSearchClick = () => {
    const event = new CustomEvent('toggleSearch');
    window.dispatchEvent(event);
  };

  return (
    <>
      <MediaFeatureSlider />
      <MobileFooterAccordion />
      <Reviews />

      <div data-label="BOTTOM_NAV_BAR" className="pageComponent qaf__bottomNavs_v2 qaf__downShiftV2 ">

        <div className="fixed  bottom-3 left-0 w-full text-sm z-30  px-6 pt-0 pb-8">
          <div className="relative flex items-center justify-between">
            <div className="flex gap-8 w-2/5 justify-start">
              {navItems.slice(0, 2).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className="flex flex-col items-center  relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute -top-2 h-10 w-10 "
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    )}
                    <motion.div
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      className={`z-10 ${isActive ? 'text-red-700' : 'text-gray-500'}`}
                    >
                      {item.icon}
                    </motion.div>
                    <span className={`z-10 mt-3 ${isActive ? 'text-red-700 ' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Center Search Floating Button */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 -translate-y-6">
              <button
                onClick={handleSearchClick}
                className="bg-red-700 p-4 rounded-full shadow-xl border-4 border-white text-white hover:bg-red-700 transition duration-300"
              >
                <Search size={24} />
              </button>
            </div>

            {/* Right 2 items */}
            <div className="flex gap-8 w-2/5 justify-end">
              {navItems.slice(2).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => router.push(item.href)}
                    className="flex flex-col items-center relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="absolute -top-2 h-10 w-10 bg-red-100 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      />
                    )}
                    <motion.div
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      className={`z-10 ${isActive ? 'text-red-700' : 'text-gray-500'}`}
                    >
                      {item.icon}
                    </motion.div>
                    <span className={`z-10 mt-3 ${isActive ? 'text-red-700 ' : 'text-gray-500'}`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="qaf__bottom_bar_container"><div className="qaf__left_blank_div"></div><div className="qaf__left_blank_div_wrap"></div>
        <Image
  src="https://static.99acres.com/universalhp/img/m_hp_bottomNavBar_svg.svg"
  alt="Bottom Nav Design"
  width={500}
  height={40}
  className="qaf__bottomNavBar_img"
/>

        <div className="qaf__right_blank_div"></div><div className="qaf__right_blank_div_wrap"></div></div></div>
    </>
  );
}
