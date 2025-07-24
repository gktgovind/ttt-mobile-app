"use client";
import { useState } from "react";
import { Search, MapPin, Compass, MountainSnow } from "lucide-react";

const suggestions = [
  { icon: <MountainSnow size={16} />, label: "Kailash Mansarovar Yatra", href: "/kailash" },
  { icon: <Compass size={16} />, label: "Adi Kailash Yatra", href: "/adi-kailash" },
  { icon: <MapPin size={16} />, label: "Char Dham Yatra", href: "/char-dham" },
  { icon: <MapPin size={16} />, label: "Nepal Tour Packages", href: "/nepal" },
];

export default function SearchWithSuggestions() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 border border-gray-300 dark:border-zinc-700 rounded-xl px-4 py-2 bg-white dark:bg-zinc-900 shadow-sm">
        <Search className="text-gray-400" size={18} />
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Search Yatra, Destination..."
          className="w-full outline-none bg-transparent text-sm text-gray-800 dark:text-gray-200"
        />
      </div>

      {isFocused && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 mt-2 rounded-xl shadow-xl z-50">
          {suggestions.map((item, index) => (
            <a
              href={item.href}
              key={index}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
