import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { UsageChart } from './components/UsageChart';
import { DeviceList } from './components/DeviceList';
import { PackageCard } from './components/PackageCard';
import { WifiZoneList } from './components/WifiZoneList';
import { InfrastructureList } from './components/InfrastructureList';
import { AdminPanel } from './components/AdminPanel';
import { cn } from './lib/utils';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Users, 
  Activity, 
  Globe, 
  TrendingUp,
  Download,
  Upload,
  Wifi,
  LayoutDashboard,
  Settings,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Active Users', value: '124', icon: Users, color: 'text-blue-500', trend: '+12%', bg: 'bg-blue-500/10' },
    { label: 'Data Used', value: '1.2 TB', icon: Activity, color: 'text-emerald-500', trend: '+5%', bg: 'bg-emerald-500/10' },
    { label: 'Average Speed', value: '45 Mbps', icon: TrendingUp, color: 'text-amber-500', trend: '-2%', bg: 'bg-amber-500/10' },
    { label: 'Global Rank', value: '#1,204', icon: Globe, color: 'text-purple-500', trend: '+88', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 lg:h-20 border-b border-slate-900 flex items-center justify-between px-4 lg:px-8 bg-slate-950/50 backdrop-blur-xl shrink-0 z-20">
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-11 pr-4 text-sm focus:outline-none focus:border-blue-500/40 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">MI Wifi</span>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden sm:flex items-center gap-2 p-1.5 bg-slate-900/50 border border-slate-800 rounded-xl px-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              <span className="text-[10px] lg:text-xs font-semibold text-emerald-400">System Online</span>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3 lg:pr-2 lg:border-r lg:border-slate-800">
               <button className="p-2 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-white transition-colors relative">
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-950" />
               </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">MI Admin</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1 font-semibold">Premium</p>
              </div>
              <div 
                onClick={() => setActiveTab('admin')}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/20 cursor-pointer active:scale-90 transition-transform"
              >
                <div className="w-full h-full rounded-[9px] bg-slate-950 flex items-center justify-center overflow-hidden">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=admin`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
            
            {/* Context Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                  {activeTab === 'dashboard' ? 'Welcome Back!' : 
                   activeTab === 'admin' ? 'System Administrator' :
                   activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <p className="text-sm lg:text-base text-slate-500 mt-1">
                  {activeTab === 'admin' ? 'Manage your networking assets.' : 'System overview and network activity.'}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs lg:text-sm font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Report
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-blue-600 text-white text-xs lg:text-sm font-semibold hover:bg-blue-500 transition-colors shadow-lg">
                  + Add Package
                </button>
              </div>
            </div>

            {/* Main Tabs Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} w-fit mb-4`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                          </div>
                          <div className={cn(
                            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                            stat.trend.startsWith('+') ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"
                          )}>
                            {stat.trend}
                          </div>
                        </div>
                        {/* Decorative Background Accent */}
                        <div className={cn("absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity", stat.bg)} />
                      </div>
                    ))}
                  </div>

                  {/* Dashboard Main Visuals */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <UsageChart />
                    </div>
                    <div>
                      <div className="bg-slate-900 h-[320px] rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center text-center">
                         <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 relative">
                            <Activity className="w-8 h-8 text-blue-500" />
                            <motion.div 
                              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute inset-0 rounded-full bg-blue-500"
                            />
                         </div>
                         <h4 className="text-white font-bold text-lg mb-2">Live Status</h4>
                         <p className="text-slate-400 text-sm mb-6">Real-time throughput: <br/><span className="text-blue-400 font-mono font-bold">12.4 MB/s</span> down • <span className="text-emerald-400 font-mono font-bold">4.2 MB/s</span> up</p>
                         <button className="w-full py-2.5 bg-blue-600 rounded-xl font-semibold text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
                            Monitor Signal Strength
                         </button>
                      </div>
                    </div>
                  </div>

                  {/* Device Monitoring Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Live Monitoring</h3>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">Active</button>
                        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500">History</button>
                      </div>
                    </div>
                    <DeviceList />
                  </div>

                  {/* Infrastructure Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">System Infrastructure</h3>
                      <button className="text-xs font-bold text-blue-400 hover:text-blue-300">View All Assets</button>
                    </div>
                    <InfrastructureList />
                  </div>
                </motion.div>
              )}

              {activeTab === 'zones' && (
                <motion.div
                  key="zones"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white tracking-tight">Access Point Distribution</h3>
                    <div className="flex gap-2">
                       <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-emerald-400">ALL NODES ONLINE</span>
                       </div>
                    </div>
                  </div>
                  <WifiZoneList />
                </motion.div>
              )}

              {activeTab === 'packages' && (
                <motion.div
                  key="packages"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-900/20">
                      <h4 className="font-bold text-lg mb-1">Total Revenue</h4>
                      <p className="text-3xl font-black mb-4">৳14,250</p>
                      <div className="flex justify-between items-center text-xs opacity-80 border-t border-white/20 pt-4">
                         <span>This Month</span>
                         <span className="flex items-center gap-1">< TrendingUp className="w-3 h-3" /> +15.5%</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="font-bold text-slate-400 text-sm mb-1 uppercase tracking-wider">Packages Sold</h4>
                      <p className="text-3xl font-black text-white mb-4">342</p>
                      <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-800">
                         <span className="text-slate-500">Last 30 Days</span>
                         <span className="text-emerald-400 font-bold">+24 units</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                      <h4 className="font-bold text-slate-400 text-sm mb-1 uppercase tracking-wider">Active Subs</h4>
                      <p className="text-3xl font-black text-white mb-4">89</p>
                      <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-800">
                         <span className="text-slate-500">Current Running</span>
                         <span className="text-amber-400 font-bold">-4 expired</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-6">Wifi Recharge Packages</h3>
                    <PackageCard />
                  </div>
                </motion.div>
              )}

              {activeTab === 'admin' && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AdminPanel />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-xl border-t border-slate-900 px-6 flex items-center justify-between z-50">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
            { id: 'zones', icon: Wifi, label: 'Zones' },
            { id: 'packages', icon: Zap, label: 'Plans' },
            { id: 'admin', icon: Settings, label: 'Admin' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300 relative",
                activeTab === item.id ? "text-blue-500 scale-110" : "text-slate-50"
              )}
            >
              {activeTab === item.id && (
                <motion.div 
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-4 w-12 h-1 bg-blue-500 rounded-full"
                />
              )}
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>
      </main>

      {/* Inline styles for custom scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
      `}</style>
    </div>
  );
}
