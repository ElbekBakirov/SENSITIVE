
import React from 'react';
import { ProPreset } from '../types';

const presets: ProPreset[] = [
  {
    name: "Nobru",
    device: "iPhone 15 Pro Max",
    specialty: "King of Movement",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nobru",
    settings: { general: 182, redDot: 170, scope2x: 164, scope4x: 156, sniperScope: 90 }
  },
  {
    name: "White444",
    device: "PC / Emulator",
    specialty: "One-Tap Good",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=White",
    settings: { general: 200, redDot: 190, scope2x: 180, scope4x: 170, sniperScope: 100 }
  },
  {
    name: "Ruok FF",
    device: "iPad Pro",
    specialty: "Precision Aim",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ruok",
    settings: { general: 190, redDot: 180, scope2x: 170, scope4x: 160, sniperScope: 80 }
  }
];

const ProPresets: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {presets.map((p) => (
        <div key={p.name} className="glass p-6 rounded-3xl border border-white/10 hover:border-orange-500/50 transition-all group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 overflow-hidden border-2 border-orange-500/20 group-hover:border-orange-500 transition-all">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-xl font-black font-orbitron text-white">{p.name}</h4>
              <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">{p.specialty}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs text-slate-500 font-bold uppercase">Device: {p.device}</p>
              <span className="text-[9px] bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded border border-orange-500/20 font-black">200 SCALE</span>
            </div>
            {Object.entries(p.settings).map(([key, val]) => (
              <div key={key} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-orbitron font-bold text-orange-400">{val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProPresets;
