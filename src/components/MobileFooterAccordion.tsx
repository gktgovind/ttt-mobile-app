import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp,Facebook,
  Instagram,
  Youtube,
  Linkedin,
  X,
 } from 'lucide-react';
import Image from 'next/image';

const footerData = [
  {
    id: 'm1',
    title: 'Quick Links',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about-us', label: 'About us' },
      { href: '/contact-us', label: 'Contact Us' },
      { href: '/b2b', label: 'B2B' },
      { href: '/career', label: 'Career' },
      { href: '/faqs', label: 'FAQs' },
      { href: '/terms-conditions', label: 'Terms & Conditions' },
      { href: '/cancellation-policy', label: 'Cancellation Policy' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
    ],
  },
  {
    id: 'm2',
    title: 'Tour Resources',
    links: [
      { href: '/kailash-mansarovar-yatra-videos', label: 'Videos' },
      { href: '/kailash-mansarovar-yatra-photos', label: 'Gallery' },
      { href: '/traveller-reviews', label: 'Traveller Reviews' },
      { href: '/news', label: 'News' },
      { href: '/faqs', label: 'Kailash Yatra FAQs' },
      { href: '/download', label: 'Download All Important Doc' },
      { href: '/kailash-mansarovar-yatra-registration', label: 'Bank Details' },
      { href: '/weather-at-kailash-mansarovar', label: 'Weather At Kailash Mansarovar' },
      { href: '/kailash-mansarovar-yatra-overland-weather', label: 'Kailash Yatra By Overland Weather' },
      { href: '/guidelines-for-kailash-yatra', label: 'Guidelines For Kailash Yatra' },
      { href: '/package/kailash-mansarovar', label: 'Kailash Yatra Packages' },
    ],
  },
  {
    id: 'm3',
    title: 'Trip To Temples Packages',
    links: [
      { href: '/kailash-mansarovar/kailash-yatra-by-helicopter', label: 'Helicopter from Lucknow (11 Days)' },
      { href: '/kailash-mansarovar/overland-kailash-mansarovar-yatra', label: 'Overland Yatra (14 Days)' },
      { href: '/kailash-mansarovar/kailash-yatra-by-helicopter-in-5-days', label: 'Helicopter (5 Days)' },
      { href: '/kailash-mansarovar/kailash-mansarovar-by-helicopter-via-kathmandu', label: 'From Kathmandu' },
      { href: '/kailash-mansarovar/kailash-mansarovar-yatra-via-lucknow', label: 'Via Lucknow' },
      { href: '/kailash-mansarovar/kailash-mansarovar-inner-parikrama', label: 'Inner Parikrama' },
      { href: '/kailash-mansarovar/kailash-yatra-via-lhasa', label: 'Via Lhasa' },
      { href: '/kailash-mansarovar/vip-kailash-package', label: 'VIP Package' },
      { href: '/kailash-mansarovar-yatra-registration', label: 'Yatra 2025' },
    ],
  },
  {
    id: 'm4',
    title: 'Popular Destination',
    links: [
      { href: '/package/kailash-mansarovar', label: 'Kailash Yatra Packages' },
      { href: '/package/char-dham', label: 'Char Dham Yatra' },
      { href: '/package/adi-kailash', label: 'Adi Kailash Yatra' },
      { href: '/package/sri-lanka', label: 'Sri Lanka Tour Package' },
      { href: '/package/varanasi-tour', label: 'Varanasi Tour Packages' },
    ],
  },
  {
    id: 'm5',
    title: 'Popular Blogs',
    links: [
      { href: '/blogs/kailash-mansarovar/about-mount-kailash', label: 'About Mount Kailash' },
      { href: '/blogs/kailash-mansarovar/history-of-kailash-mansarovar', label: 'History Of Kailash Mansarovar' },
      { href: '/blogs/adi-kailash/adi-kailash', label: 'Adi Kailash' },
      { href: '/blogs/kailash-mansarovar/shiva-the-god-of-gods', label: 'Shiva The God Of Gods' },
      { href: '/blogs/adi-kailash', label: 'Adi Kailash Tour Blogs' },
      { href: '/blogs/char-dham/char-dham-yatra', label: 'Chota Chardham Yatra' },
    ],
  },
];

export default function MobileFooterAccordion() {
  const [active, setActive] = useState<string | null>(null);

  const toggle = (id: string) => {
    setActive(prev => (prev === id ? null : id));
  };

  return (
    <>
    <div className="w-full max-w-md mx-auto px-4 ">
      {footerData.map((section) => (
        <div key={section.id} className="mb-2 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-500">
          <button
            onClick={() => toggle(section.id)}
            className={`w-full flex justify-between items-center px-4 py-3 font-medium  text-left hover:bg-gray-100 transition ${
              active === section.id ? '!text-gray-900' : 'text-gray-700'
            }`}
          >
            <span>{section.title}</span>
            {active === section.id ? (
              <ChevronUp className="w-5 h-5 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 transition-transform duration-300" />
            )}
          </button>
          <div
            className={` text-sm text-gray-600 transition-all duration-300 ${
              active === section.id ? 'px-4 pb-3 max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <ul className='space-y-4'>
            {section.links.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className="hover:text-red-600  transition-colors duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
   <div className="bg-gray-900 pb-20 text-center py-10">
      {/* Social Media */}
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Social Media</h3>
      <div className="flex justify-center gap-7 mb-8">
        <Link href="https://instagram.com" target="_blank">
          <Instagram className="text-gray-300 hover:text-black w-7 h-7 transition" />
        </Link>
        <Link href="https://facebook.com" target="_blank">
          <Facebook className="text-gray-300 hover:text-black w-7 h-7 transition" />
        </Link>
        {/* <Link href="https://tiktok.com" target="_blank">
          <Music2 className="text-gray-300 hover:text-black w-7 h-7 transition" />
        </Link> */}
        <Link href="https://twitter.com" target="_blank">
          <X className="text-gray-300 hover:text-black w-7 h-7 transition" />
        </Link>
        <Link href="https://youtube.com" target="_blank">
          <Youtube className="text-gray-300 hover:text-black w-7 h-7 transition" />
        </Link>
        <Link href="https://linkedin.com" target="_blank">
          <Linkedin className="text-gray-300 hover:text-black w-7 h-7 transition" />
        </Link>
      </div>

      {/* Download Section */}
      <h3 className="text-lg font-semibold mb-4 text-gray-100">Download</h3>
      <div className="flex justify-center flex-wrap gap-4">
        <Link href="https://play.google.com/store/apps/details?id=com.triptotemples" target="_blank">
          <Image
            src="/downloadapp-en-googleplay.png"
            alt="Get it on Google Play"
            width={140}
            height={40}
          />
        </Link>
        <Link href="https://apps.apple.com" target="_blank">
          <Image
            src="/downloadapp-en-appstore.png"
            alt="Download on the App Store"
            width={140}
            height={40}
          />
        </Link>
       
      </div>
      <div className="text-center text-xs text-gray-300 py-5">Copyright 2025 TripToTemples.com. All rights reserved. <br/></div>
    </div>
    </>
    
  );
}
