import React from 'react';
import { MOCK_DEVICES } from '../constants';
import { useFirestoreData } from '../lib/hooks';
import { Device } from '../types';
import { Smartphone, Laptop, Tv, Monitor, MoreVertical, Wifi, WifiOff, Server, ShieldCheck, Database } from 'lucide-react';
import { cn } from '../lib/utils';

export function DeviceList() {
  const { data: devices } = useFirestoreData<Device>('devices', MOCK_DEVICES);

  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('iphone') || n.includes('samsumg') || n.includes('android')) return Smartphone;
    if (n.includes('macbook') || n.includes('laptop')) return Laptop;
    if (n.includes('tv')) return Tv;
    if (n.includes('server')) return Database;
    if (n.includes('nvr')) return ShieldCheck;
    if (n.includes('mikrotik') || n.includes('router')) return Server;
    return Monitor;
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
        <div>
          <h3 className="text-white font-semibold">Active Devices</h3>
          <p className="text-sm text-slate-400">{devices.length} devices connected to the network</p>
        </div>
        <button className="text-xs font-semibold text-blue-400 hover:text-blue-300">View All</button>
      </div>

      <div className="divide-y divide-slate-800">
        {devices.map((device) => {
          const Icon = getIcon(device.name);
          return (
            <div key={device.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl bg-slate-950 border",
                  device.status === 'active' ? "border-blue-500/20 text-blue-400" : "border-slate-800 text-slate-500"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium flex items-center gap-2">
                    {device.name}
                    {device.status === 'active' ? (
                      <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    ) : (
                      <span className="flex h-2 w-2 rounded-full bg-slate-600" />
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">{device.ip} • {device.mac}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Usage</p>
                  <p className="text-sm text-white font-medium">{(device.usage / 1024).toFixed(2)} GB</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Session</p>
                  <p className="text-sm text-white font-medium">{device.connectedAt}</p>
                </div>
                <button className="p-1 hover:bg-slate-700 rounded-lg text-slate-400">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
