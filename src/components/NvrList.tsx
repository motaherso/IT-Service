import React from 'react';
import { MOCK_NVR } from '../constants';
import { useFirestoreData } from '../lib/hooks';
import { Nvr } from '../types';
import { ShieldCheck, HardDrive, Video, ExternalLink, MoreHorizontal, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function NvrList() {
  const { data: nvrs } = useFirestoreData<Nvr>('nvr', MOCK_NVR);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {nvrs.map((nvr, idx) => (
        <motion.div
           key={nvr.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.1 }}
           className="relative group h-full"
        >
          <div className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2.5rem] p-6 hover:bg-slate-900/60 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                  nvr.status === 'online' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {nvr.status}
                </div>
                <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {nvr.name}
              </h3>
              <p className="text-xs text-slate-500 font-mono mb-6">ID: {nvr.id}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Video className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Cams</span>
                  </div>
                  <p className="text-white font-bold">{nvr.activeCameras} <span className="text-slate-500 font-normal text-[10px]">/ {nvr.channels} CH</span></p>
                </div>
                <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Status</span>
                  </div>
                  <p className="text-white font-bold text-xs uppercase">Recording</p>
                </div>
              </div>
            </div>

            {nvr.managementUrl && (
              <a 
                href={nvr.managementUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-all active:scale-95"
              >
                Access Control Panel
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
