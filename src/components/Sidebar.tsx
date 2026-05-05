import React from 'react';
import { 
  BarChart3, 
  Users, 
  Wifi, 
  ShieldCheck, 
  Settings, 
  LayoutDashboard,
  Zap,
  HardDrive,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'zones', label: 'WiFi Zones', icon: Wifi },
    { id: 'devices', label: 'Devices', icon: Users },
    { id: 'packages', label: 'Packages', icon: Zap },
    { id: 'nvr', label: 'NVR Security', icon: ShieldCheck },
    { id: 'fileservers', label: 'File Server', icon: HardDrive },
    { id: 'settings', label: 'Admin Panel', icon: Settings },
  ];

  const handleTabClick = (id: string) => {
    if (id === 'settings') {
      setActiveTab('admin');
    } else {
      setActiveTab(id);
    }
  };

  return (
    <div className="hidden lg:flex w-64 h-full bg-slate-950 border-r border-slate-800 flex-col p-6 gap-8 shrink-0">
      <div className="flex items-center gap-3 px-2">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Wifi className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-white text-lg tracking-tight">MI Wifi</h1>
          <p className="text-xs text-slate-400">Wifi Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => handleTabClick(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
              (activeTab === item.id || (activeTab === 'admin' && item.id === 'settings')) 
                ? "bg-slate-900 shadow-[inset_0_1px_rgba(255,255,255,0.05)]" 
                : "hover:bg-slate-900/50 text-slate-400 hover:text-white"
            )}
          >
            {(activeTab === item.id || (activeTab === 'admin' && item.id === 'settings')) && (
              <motion.div 
                layoutId="active-tab"
                className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full"
              />
            )}
            <item.icon className={cn(
              "w-5 h-5",
              activeTab === item.id ? "text-blue-400" : "group-hover:text-blue-300"
            )} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-8 border-t border-slate-900">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
