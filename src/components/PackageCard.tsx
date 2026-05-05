import React from 'react';
import { MOCK_PACKAGES } from '../constants';
import { useFirestoreData } from '../lib/hooks';
import { Package } from '../types';
import { Clock, Zap, DollarSign, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function PackageCard() {
  const { data: packages } = useFirestoreData<Package>('packages', MOCK_PACKAGES);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {packages.map((pkg, idx) => (
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.1 }}
           key={pkg.id}
           className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 hover:border-blue-500/30 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
              <Zap className="w-6 h-6 text-blue-500 group-hover:text-white" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">৳{pkg.price}</span>
              <p className="text-xs text-slate-400 capitalize">{pkg.duration}</p>
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-1">{pkg.name}</h3>
          <p className="text-slate-400 text-sm mb-6">Enjoy lightning speed with our premium connection.</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Valid for {pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Zap className="w-4 h-4 text-slate-500" />
              <span>Speed: {pkg.speed}</span>
            </div>
          </div>
          
          <button className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-center gap-2">
            Buy Plan
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
