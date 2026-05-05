import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_USAGE } from '../constants';

export function UsageChart() {
  return (
    <div className="w-full h-80 bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-white font-semibold flex items-center gap-2">
            Network Activity
          </h3>
          <p className="text-sm text-slate-400">Total data consumed hourly</p>
        </div>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-blue-400">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            Download
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Upload
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={MOCK_USAGE}>
          <defs>
            <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis 
            dataKey="time" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}MB`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area 
            type="monotone" 
            dataKey="download" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorDown)" 
          />
          <Area 
            type="monotone" 
            dataKey="upload" 
            stroke="#10b981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorUp)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
