import React from 'react';
import { MOCK_ZONES } from '../constants';
import { useFirestoreData } from '../lib/hooks';
import { WifiZone } from '../types';
import { Wifi, Signal, Users, MoreHorizontal, ExternalLink, Printer, Server, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function WifiZoneList() {
  const { data: zones } = useFirestoreData<WifiZone>('zones', MOCK_ZONES);

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('printer')) return Printer;
    if (n.includes('server')) return Server;
    if (n.includes('nvr') || n.includes('mikrotik')) return ShieldCheck;
    return Wifi;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {zones.map((zone, idx) => {
        const Icon = getIcon(zone.name);
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={zone.id}
            className="bg-slate-900/50 rounded-2xl border border-slate-800 p-5 hover:border-blue-500/30 transition-all group relative overflow-hidden flex flex-col h-full"
          >
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              <Icon className="w-24 h-24 -mr-8 -mt-8" />
            </div>

            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold tracking-tight">{zone.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Active</span>
                  </div>
                </div>
              </div>
              <button className="p-1 hover:bg-slate-800 rounded-lg text-slate-500">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <div className="flex items-center gap-2 mb-1 text-slate-500">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Users</span>
              </div>
              <p className="text-white font-bold">{zone.users} Connected</p>
            </div>
            <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/50">
              <div className="flex items-center gap-2 mb-1 text-slate-500">
                <Signal className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Strength</span>
              </div>
              <p className="text-white font-bold">100%</p>
            </div>
          </div>

          {zone.managementUrl && (
            <a 
              href={zone.managementUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/5 p-2 rounded-lg border border-blue-500/20 mb-2"
            >
              <ExternalLink className="w-3 h-3" />
              {zone.managementUrl}
            </a>
          )}

          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-800/50">
            <div className="text-[10px] text-slate-500 font-mono">ID: {zone.id.toUpperCase()}</div>
            <button className="text-xs font-bold text-blue-400 hover:text-blue-300">Manage Zone</button>
          </div>
        </motion.div>
      );
    })}
  </div>
);
}
