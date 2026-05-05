import React from 'react';
import { MOCK_FILE_SERVERS } from '../constants';
import { useFirestoreData } from '../lib/hooks';
import { FileServer } from '../types';
import { HardDrive, ExternalLink, MoreHorizontal, Activity, Cpu, Database } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function FileServerList() {
  const { data: servers } = useFirestoreData<FileServer>('fileservers', MOCK_FILE_SERVERS);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server, idx) => (
        <motion.div
           key={server.id}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: idx * 0.1 }}
           className="relative group"
        >
          <div className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[2.5rem] p-6 hover:bg-slate-900/60 hover:border-slate-700 hover:shadow-2xl transition-all flex flex-col">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-400">
                <HardDrive className="w-6 h-6" />
              </div>
              <div className="flex gap-2">
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                  server.status === 'online' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                )}>
                  {server.status}
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {server.name}
              </h3>
              <p className="text-[10px] text-slate-500 font-mono mb-6 uppercase tracking-wider">Uptime: {server.uptime}</p>

              <div className="space-y-4 mb-6">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Storage Utilization</span>
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest">
                      {Math.round((parseFloat(server.storageUsed) / parseFloat(server.storageTotal)) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(server.storageUsed) / parseFloat(server.storageTotal)) * 100}%` }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Used: {server.storageUsed}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total: {server.storageTotal}</span>
                  </div>
                </div>
              </div>
            </div>

            {server.managementUrl && (
              <a 
                href={server.managementUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-auto w-full flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              >
                Access File System
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
