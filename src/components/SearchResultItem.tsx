'use client';

import Image from 'next/image';

interface SearchResultItemProps {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function SearchResultItem({
  title,
  location,
  description,
  imageUrl,
  onClick,
}: SearchResultItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex gap-4 p-4 rounded-xl shadow-md bg-white hover:bg-gray-50 transition cursor-pointer"
    >
      <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <p className="text-xs text-gray-600 mt-2 line-clamp-2">{description}</p>
      </div>
    </div>
  );
}
