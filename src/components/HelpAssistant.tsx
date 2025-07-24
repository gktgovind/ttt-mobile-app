// components/HelpAssistant.tsx

import { Phone, Smartphone, MessageSquare } from 'lucide-react';

export default function HelpAssistant() {
  return (
    <div className="m-3 p-4 rounded-2xl bg-red-100 shadow-sm border border-red-200">
      <h3 className="text-md font-semibold text-gray-800">How we help you</h3>
      <p className="text-sm text-gray-600 mt-1 font-medium">
        Our personal Yatra assistant is here to guide your spiritual journey.
      </p>

      <div className="mt-4 text-sm text-gray-700 font-bold">Chat with us on</div>

      <div className="mt-3 flex gap-3">
        <a
        
          href="tel:+91-8510007751"
          className="flex-1 flex flex-col text-white items-center justify-center border rounded-lg p-4 bg-red-700 hover:bg-green-50 transition"
        >
          <MessageSquare className="h-5 w-5 mb-1" />
          <span className="text-xs">WhatsApp</span>
        </a>
        <a
          href="/app"
          className="flex-1 flex flex-col text-white items-center justify-center border rounded-lg p-4 bg-red-700 hover:bg-blue-50 transition"
        >
          <Phone className="h-5 w-5  mb-1" />
          <span className="text-xs">Call</span>
        </a>
        <a
          href="/contact"
          className="flex-1 flex flex-col text-white items-center justify-center border rounded-lg p-4 bg-red-700 hover:bg-gray-100 transition"
        >
          <Smartphone size={50} className="h-5 w-5 mb-1" />
          <span className="text-xs">App</span>
        </a>
      </div>
    </div>
  );
}
