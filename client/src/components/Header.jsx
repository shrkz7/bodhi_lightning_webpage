import React from 'react';
import { Zap, Phone, MapPin, ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

export default function Header({ storeInfo, isAdminView, onToggleAdmin, onBackToQuote }) {
  return (
    <header className="header-container bg-emerald-900 text-white shadow-lg border-b-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Store Title */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-emerald-950 shadow-md">
              <Zap className="w-7 h-7 fill-current" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-white">
                  {storeInfo.name}
                </h1>
                <span className="bg-emerald-700 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-600">
                  Finolex Dealer
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-emerald-200 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {storeInfo.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href={`tel:${storeInfo.phone}`} className="hover:text-amber-300 transition-colors">
                    {storeInfo.phone}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info & Admin Access */}
          <div className="flex items-center gap-3">
            <a 
              href={`https://wa.me/${storeInfo.whatsappPhone || '918940027894'}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-emerald-600 font-medium transition-all shadow-sm"
              title="Chat on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp: +91 {storeInfo.phone}
            </a>

            {isAdminView ? (
              <button
                onClick={onBackToQuote}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-lg transition-all shadow"
              >
                <ArrowLeft className="w-4 h-4" />
                Customer Quote Mode
              </button>
            ) : (
              <button
                onClick={onToggleAdmin}
                className="flex items-center gap-1 bg-emerald-950/60 hover:bg-emerald-950 text-emerald-300 hover:text-amber-300 text-xs px-2.5 py-2 rounded-lg border border-emerald-800 transition-all"
                title="Admin Portal Access"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
