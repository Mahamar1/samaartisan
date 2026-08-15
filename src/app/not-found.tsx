import React from 'react';
import Link from 'next/link';
import { Building2, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-navy-950">Page Introuvable (404)</h1>
        <p className="text-sm text-slate-600">
          La page ou le logement que vous recherchez semble introuvable ou a été déplacé.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Retourner à l'accueil</span>
        </Link>
      </div>
    </div>
  );
}
