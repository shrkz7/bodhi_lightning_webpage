import React from 'react';
import { Phone, MapPin, Zap, Lock } from 'lucide-react';

export default function Footer({ storeInfo, onOpenAdmin }) {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-10 mt-12 border-t-2 border-emerald-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800 text-center md:text-left">
          
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-white font-bold text-lg mb-1">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-zinc-950 flex items-center justify-center text-xs font-black">
                ⚡
              </span>
              <span>{storeInfo.name}</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm">
              Authorized Finolex Electrical Wires, Multicore Cables, Industrial & Networking Solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-4 h-4 text-emerald-500" />
              {storeInfo.location}, Tamil Nadu
            </span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <a 
              href={`tel:${storeInfo.phone}`}
              className="flex items-center gap-1.5 text-amber-400 font-bold hover:text-amber-300 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 {storeInfo.phone}
            </a>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {storeInfo.name}. Finolex Price List Effective From {storeInfo.priceListDate}.
          </p>

          {/* Hidden Admin Access */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-zinc-500 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-zinc-800"
              title="Admin Portal Login"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
