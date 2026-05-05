import React from 'react';
import { MOCK_INFRASTRUCTURE } from '../constants';
import { useFirestoreData } from '../lib/hooks';
import { WifiZone } from '../types';
import { Printer, Server, ShieldCheck, ExternalLink, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

export function InfrastructureList() {
  const { data: infrastructure } = useFirestoreData<WifiZone>('infrastructure', MOCK_INFRASTRUCTURE);

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('printer')) return Printer;
    if (n.includes('server')) return Server;
    if (n.includes('nvr') || n.includes('mikrotik')) return ShieldCheck;
    return Server;
  };

  return (
    <div className="space-y-4">
      {infrastructure.map((item, idx) => {
        const Icon = getIcon(item.name);
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={item.id}
            className="bg-slate-900/50 rounded-2xl border border-slate-800 p-4 hover:border-blue-500/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold tracking-tight">{item.name}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">System Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">Status</p>
                <p className="text-emerald-400 font-bold text-sm">Balanced</p>
              </div>
              <div className="flex gap-2">
                {item.managementUrl && (
                  <a 
                    href={item.managementUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
