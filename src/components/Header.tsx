'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, Search, Bell, Sun, Moon, X, User, MessageSquare, Heart,  Users, Wallet, UserCircle, LogOut, CalendarDays, Loader2, FileText, HelpCircle, CreditCard, Star, Clock, UserPlus, Info, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";
import Link from 'next/link';
import { useTypingPlaceholder } from '@/utils/useTypingPlaceholder';
import Image from 'next/image';

export default function MobileHeader() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const typingPlaceholder = useTypingPlaceholder(); // add this at top
  const user = {
    name: "Krishan Govind",
    email: "it@triptotemples.com",
    image: "https://i.pravatar.cc/100?img=12",
  };

  useEffect(() => {
    const root = document.documentElement;
    darkMode ? root.classList.add('dark') : root.classList.remove('dark');
  }, [darkMode]);
 

const sampleResults = [
  {
    id:'1',
    title: 'Kailash Mansarovar Yatra',
    location: 'Tibet, Nepal',
    description: 'A spiritual journey to Mount Kailash and Mansarovar Lake.',
    imageUrl: 'https://cdn.triptotemples.com/packages/65be0bb99cc6d325323d0056-kailash-1200.1800-10.webp',
  },
  {
    id:'2',
    title: 'Char Dham Yatra',
    location: 'Uttarakhand, India',
    description: 'Visit Yamunotri, Gangotri, Kedarnath and Badrinath in a sacred circuit.',
    imageUrl: 'https://cdn.triptotemples.com/packages/65be0bb99cc6d325323d0050-app-chardham-1200x1800-4.webp',
  },
];


  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  type SidebarItemProps = {
    icon: ReactNode;
    text: string;
    href: string;
  };
  function SidebarItem({ icon, text, href }: SidebarItemProps) {
    return (
      <Link href={href} className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <div className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200">
          {icon}
          {text}
        </div>
        <div className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-red-700 dark:bg-gray-900 shadow-md px-1 py-0 flex justify-between items-center">
        <button
          className="py-4 flex items-center space-x-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <div className=''><img src={user.image} alt="User" width={40} height={40} className="rounded-full border-2 border-white" />
</div>
          <Menu className="h-6 w-6 text-white dark:text-white" />
        </button>

        <h1 className="text-lg font-bold text-white dark:text-white"><img src="https://cdn.triptotemples.com/images/ttt-com-logo-white.png" className='w-20' /></h1>

        <div className="flex items-center space-x-2">
          <button
            className="py-5 px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-6 w-6 text-white dark:text-white" />
          </button>
          <button className="py-5 px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Bell className="h-6 w-6 text-white dark:text-white" />
          </button>
          <button
            className="py-5 px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </header>
      {searchOpen && (
        <div className="fixed inset-0 z-100 bg-gray-100 dark:bg-gray-900 px-4 py-6">
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={typingPlaceholder + "..."}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-2.5 right-2 p-1 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white"
            >
              <X className="h-6 w-6" />
            </button>
             {sampleResults.map((item, idx) => (
         <div
            //  onClick={onClick}
            key={idx}
              className="flex gap-4 p-4 mt-2 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="w-16 h-16 relative rounded-sm overflow-hidden flex-shrink-0">
                <Image
                  src={`${item?.imageUrl}?tr=w-100`}
                  alt={item?.title}
                  fill
                  className="w-100"
                />
              </div>
              <div className="flex flex-col">
                <div>
                  <h3 className="text-base mt-2 font-semibold text-gray-800">{item?.title}</h3>
                  <p className="text-sm text-gray-500">{item?.location}</p>
                </div>
                {/* <p className="text-xs text-gray-600 mt-0 line-clamp-2">{item?.description}</p> */}
              </div>
            </div>
      ))}
          </div>
           
      

          {/* Suggestions */}
       

        </div>
      )}
      {/* Sidebar Drawer */}
      <div className={`fixed top-0 left-0 overflow-auto h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-700 to-red-700 px-4 py-5 rounded-b-3xl shadow-md">
          <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 text-white">
            <X size={20} />
          </button>
          <div className="flex items-center space-x-4">
            <img src={user.image} alt="User" width={48} height={48} className="rounded-full border-2 border-white" />
            <div className="text-white">
              <p className="text-sm font-semibold">Hi {user.name}</p>
              <p className="text-xs opacity-90">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Promo Section */}
        <Link href="/offers/icici-card">
          <div className="mx-3 mt-3 p-3 rounded-2xl border border-gray-200 dark:border-white flex justify-between items-center shadow-sm">
            <div>
              <p className="text-sm font-medium">TTT Gift Card</p>
              <p className="text-xs text-gray-500">Limited time offer</p>
            </div>
            <span className="bg-red-700 text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
          </div>
        </Link>

        {/* Icons Row */}
        <div className="mx-3 mt-3 p-3 rounded-2xl border border-gray-200 dark:border-white flex justify-around text-center shadow-sm">
          <Link href="/account">
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <div className="mb-1 rounded-full bg-red-100 dark:text-red-900 p-2 w-9 h-9 flex items-center justify-center mx-auto">
                <User size={16} />
              </div>
              <p className="text-xs font-medium">Account</p>
            </div>
          </Link>
          <Link href="/support">
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <div className="mb-1 rounded-full bg-red-100 dark:text-red-900 p-2 w-9 h-9 flex items-center justify-center mx-auto">
                <MessageSquare size={16} />
              </div>
              <p className="text-xs font-medium">Support</p>
            </div>
          </Link>
          <Link href="/notifications">
            <div className="text-sm text-gray-600 dark:text-gray-200">
              <div className="mb-1 rounded-full bg-red-100 dark:text-red-900 p-2 w-9 h-9 flex items-center justify-center mx-auto">
                <Bell size={16} className='' />
              </div>
              <p className="text-xs font-medium">Notify</p>
            </div>
          </Link>
        </div>

        {/* My Trips section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm space-y-3 m-3 ">
          <div className="text-sm font-semibold mb-2">My Trips</div>
          <SidebarItem icon={<CalendarDays size={18} />} text="My Bookings" href="/bookings" />
          <SidebarItem icon={<Heart size={18} />} text="Wish List" href="/wishlist" />
          <SidebarItem icon={<Users size={18} />} text="Travellers List" href="/travellers" />
          <SidebarItem icon={<Loader2 size={18} />} text="Yatra Progress" href="/yatra-progress" />
        </div>

        {/* Enquiry section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm space-y-3 m-3 ">
          <div className="text-sm font-semibold mb-2">Enquiry</div>
          <SidebarItem icon={<HelpCircle size={18} />} text="My Enquiries" href="/enquiries" />
          <SidebarItem icon={<FileText size={18} />} text="Free KMY Registration" href="/kmy-registration" />
        </div>

        {/* Rewards */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm space-y-3 m-3 ">
          <div className="text-sm font-semibold mb-2">Rewards</div>
          <SidebarItem icon={<Wallet size={18} />} text="My Wallet" href="/wallet" />
        </div>

        {/* Reviews & Others */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm space-y-3 m-3 ">
          <div className="text-sm font-semibold mb-2">Reviews & Other</div>
          <SidebarItem icon={<CreditCard size={18} />} text="Bank Details" href="/bank-details" />
          <SidebarItem icon={<Clock size={18} />} text="Coupon History" href="/coupon-history" />
          <SidebarItem icon={<Star size={18} />} text="Traveller’s Reviews" href="/reviews" />
        </div>

        {/* Share & Read */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm space-y-3 m-3 ">
          <div className="text-sm font-semibold mb-2">Share & Read</div>
          <SidebarItem icon={<UserPlus size={18} />} text="Invite Friends" href="/" />
          <SidebarItem icon={<Info size={18} />} text="About Us" href="/" />
          <SidebarItem icon={<ShieldCheck size={18} />} text="Privacy Policy" href="/" />
          <SidebarItem icon={<FileText size={18} />} text="Terms & Conditions" href="/" />
          {/* <SidebarItem icon={<LogOut size={18} />} text="Logout" href="/" /> */}

        </div>

        {/* Login/Logout */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
          {user ? (
            <Link href="/logout" className="inline-flex items-center gap-2 text-red-500 font-medium">
              <LogOut size={16} /> Logout
            </Link>
          ) : (
            <Link href="/login" className="inline-flex items-center gap-2 text-blue-500 font-medium">
              <UserCircle size={16} /> Login
            </Link>
          )}
        </div>
          <br />

      </div>


      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{background:"rgba(0,0,0,0.7)"}}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* 🔍 Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex items-start px-4 py-6">
          <div className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              placeholder={typingPlaceholder + "..."}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-2.5 right-2 p-1 rounded-md text-white dark:text-white hover:bg-gray-200 dark:hover:bg-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
        </div>
      )}
    </>
  );
}
