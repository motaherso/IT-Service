import React, { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { 
  MOCK_ZONES, 
  MOCK_INFRASTRUCTURE, 
  MOCK_DEVICES, 
  MOCK_PACKAGES 
} from '../constants';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Lock, 
  Wifi, 
  Server, 
  Smartphone, 
  Package as PackageIcon,
  X,
  Save,
  LogIn,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

enum CollectionName {
  ZONES = 'zones',
  INFRASTRUCTURE = 'infrastructure',
  DEVICES = 'devices',
  PACKAGES = 'packages'
}

const ADMIN_PASSWORD = 'itmi123*@';

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<CollectionName>(CollectionName.ZONES);
  const [data, setData] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (!isAuthenticated) return;

    const unsub = onSnapshot(collection(db, activeTab), (snapshot) => {
      setData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Firestore Error:", error);
    });

    return unsub;
  }, [activeTab, isAuthenticated]);

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);

  const handleSyncData = async () => {
    if (!window.confirm("This will import all previous WiFi Zones and Devices into your live database. Continue?")) return;
    
    setIsSyncing(true);
    try {
      // Sync Zones
      const zonesSnap = await getDocs(collection(db, CollectionName.ZONES));
      if (zonesSnap.empty) {
        for (const zone of MOCK_ZONES) {
          const { id, ...data } = zone;
          await addDoc(collection(db, CollectionName.ZONES), data);
        }
      }

      // Sync Infrastructure
      const infraSnap = await getDocs(collection(db, CollectionName.INFRASTRUCTURE));
      if (infraSnap.empty) {
        for (const item of MOCK_INFRASTRUCTURE) {
          const { id, ...data } = item;
          await addDoc(collection(db, CollectionName.INFRASTRUCTURE), data);
        }
      }

      // Sync Devices
      const devicesSnap = await getDocs(collection(db, CollectionName.DEVICES));
      if (devicesSnap.empty) {
        for (const device of MOCK_DEVICES) {
          const { id, ...data } = device;
          await addDoc(collection(db, CollectionName.DEVICES), data);
        }
      }

      // Sync Packages
      const packagesSnap = await getDocs(collection(db, CollectionName.PACKAGES));
      if (packagesSnap.empty) {
        for (const pkg of MOCK_PACKAGES) {
          const { id, ...data } = pkg;
          await addDoc(collection(db, CollectionName.PACKAGES), data);
        }
      }

      setSyncComplete(true);
      setTimeout(() => setSyncComplete(false), 3000);
    } catch (error) {
      console.error("Sync failed:", error);
      alert("Sync failed. Check console for details.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setInputPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, activeTab, editingId), formData);
        setEditingId(null);
      } else {
        await addDoc(collection(db, activeTab), formData);
      }
      setFormData({});
      setIsAdding(false);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, activeTab, id));
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  const tabIcons = {
    [CollectionName.ZONES]: Wifi,
    [CollectionName.INFRASTRUCTURE]: Server,
    [CollectionName.DEVICES]: Smartphone,
    [CollectionName.PACKAGES]: PackageIcon,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
          
          <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
            <Lock className="w-10 h-10 text-blue-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Portal</h2>
          <p className="text-slate-400 mb-10 text-sm">Please enter your system password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <input 
                type="password" 
                autoFocus
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium text-center tracking-widest"
              />
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs font-bold mt-3"
                >
                  {error}
                </motion.p>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              <LogIn className="w-5 h-5" />
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-4 mb-1">
            <h2 className="text-3xl font-bold text-white tracking-tight">Admin Control Panel</h2>
            <button 
              onClick={handleLogout}
              className="text-[10px] px-2 py-1 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-500 font-bold rounded-md transition-all uppercase tracking-widest"
            >
              Sign Out
            </button>
          </div>
          <p className="text-slate-400">Manage your network infrastructure and users.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSyncData}
            disabled={isSyncing}
            className={cn(
              "flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold text-sm",
              syncComplete 
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
            )}
          >
            {isSyncing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : syncComplete ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {syncComplete ? "Data Synced" : isSyncing ? "Syncing..." : "Sync Previous Data"}
          </button>
          <button 
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({}); }}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-900/50 rounded-2xl border border-slate-800 w-fit">
        {Object.values(CollectionName).map((tab) => {
          const Icon = tabIcons[tab];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                activeTab === tab 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="capitalize">{tab}</span>
            </button>
          );
        })}
      </div>

      {/* Data Table / Card View */}
      <div className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50">
                <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-500 tracking-wider">Details</th>
                <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-500 tracking-wider">Storage Info</th>
                <th className="px-6 py-4 text-[10px] uppercase font-bold text-slate-500 tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
                        {React.createElement(tabIcons[activeTab], { className: "w-5 h-5" })}
                      </div>
                      <div>
                        <p className="text-white font-bold">{item.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {activeTab === CollectionName.ZONES || activeTab === CollectionName.INFRASTRUCTURE ? (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">Status: <span className="text-emerald-400 uppercase font-bold">{item.status}</span></p>
                        <p className="text-xs text-slate-400">Users: <span className="text-white">{item.users}</span></p>
                      </div>
                    ) : activeTab === CollectionName.DEVICES ? (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">IP: <span className="text-blue-400">{item.ip}</span></p>
                        <p className="text-xs text-slate-400">MAC: <span className="text-slate-400 font-mono">{item.mac}</span></p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs text-slate-400">Price: <span className="text-emerald-400">৳{item.price}</span></p>
                        <p className="text-xs text-slate-400">Speed: <span className="text-white">{item.speed}</span></p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => { setEditingId(item.id); setFormData(item); setIsAdding(true); }}
                        className="p-2 hover:bg-slate-700 rounded-lg text-blue-400 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-800">
          {data.map((item) => (
            <div key={item.id} className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
                    {React.createElement(tabIcons[activeTab], { className: "w-5 h-5" })}
                  </div>
                  <div>
                    <p className="text-white font-bold">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono tracking-tighter">ID: {item.id}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => { setEditingId(item.id); setFormData(item); setIsAdding(true); }}
                    className="p-2 bg-slate-800 rounded-lg text-blue-400 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-slate-800 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                {activeTab === CollectionName.ZONES || activeTab === CollectionName.INFRASTRUCTURE ? (
                  <>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Status</p>
                      <span className="text-emerald-400 uppercase font-bold text-xs">{item.status}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Users</p>
                      <span className="text-white text-xs">{item.users}</span>
                    </div>
                  </>
                ) : activeTab === CollectionName.DEVICES ? (
                  <>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">IP Address</p>
                      <span className="text-blue-400 text-xs">{item.ip}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">MAC</p>
                      <span className="text-slate-400 font-mono text-[10px]">{item.mac}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Price</p>
                      <span className="text-emerald-400 text-xs font-bold">৳{item.price}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Speed</p>
                      <span className="text-white text-xs">{item.speed}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {data.length === 0 && !isAdding && (
          <div className="px-6 py-12 text-center text-slate-500">
            No items found in this section. Start by adding one!
          </div>
        )}
      </div>

      {/* Modal / Form Overlay */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setIsAdding(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-600 rounded-2xl">
                    {React.createElement(tabIcons[activeTab], { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {editingId ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                    </h3>
                    <p className="text-xs text-slate-400 capitalize">Section: {activeTab}</p>
                  </div>
                </div>
                <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all font-medium"
                      placeholder="Enter name..."
                    />
                  </div>

                  {activeTab === CollectionName.ZONES || activeTab === CollectionName.INFRASTRUCTURE ? (
                    <>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Management URL</label>
                        <input 
                          type="url" 
                          value={formData.managementUrl || ''}
                          onChange={(e) => setFormData({...formData, managementUrl: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-600 transition-all font-medium"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Status</label>
                          <select 
                            value={formData.status || 'online'}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-600 transition-all font-medium"
                          >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Active Users</label>
                          <input 
                            type="number" 
                            value={formData.users || 0}
                            onChange={(e) => setFormData({...formData, users: parseInt(e.target.value)})}
                            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-600 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </>
                  ) : activeTab === CollectionName.DEVICES ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">IP Address</label>
                        <input 
                          type="text" 
                          required
                          value={formData.ip || ''}
                          onChange={(e) => setFormData({...formData, ip: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-600 transition-all"
                          placeholder="192.168..."
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">MAC Address</label>
                        <input 
                          type="text" 
                          required
                          value={formData.mac || ''}
                          onChange={(e) => setFormData({...formData, mac: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-600 transition-all"
                          placeholder="00:11:22..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Price (৳)</label>
                        <input 
                          type="number" 
                          required
                          value={formData.price || 0}
                          onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-600 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Speed</label>
                        <input 
                          type="text" 
                          required
                          value={formData.speed || ''}
                          onChange={(e) => setFormData({...formData, speed: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-600 transition-all"
                          placeholder="10 Mbps"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? 'Save Changes' : 'Create Asset'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
