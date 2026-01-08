
import React, { useState } from 'react';
import { UserConfig, DeviceType, PlayStyle, RefreshRate } from '../types';

interface Props {
  onGenerate: (config: UserConfig) => void;
  isLoading: boolean;
}

const SensitivityForm: React.FC<Props> = ({ onGenerate, isLoading }) => {
  const [config, setConfig] = useState<UserConfig>({
    deviceModel: '',
    deviceType: 'Android',
    dpi: 440,
    playStyle: 'Aggressive',
    aimType: 'Default',
    refreshRate: 60
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.deviceModel) return alert("System requires hardware model signature.");
    onGenerate(config);
  };

  return (
    <div className="glass p-8 md:p-10 rounded-sm cyber-border animate-fade-in max-w-3xl mx-auto">
      <div className="mb-10 flex items-start justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-black font-orbitron text-white uppercase tracking-tighter italic">Parameters</h2>
          <p className="text-cyan-500/60 text-[10px] font-bold tracking-[0.3em] mt-1 uppercase">Input hardware specifications below</p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-bold text-slate-600 uppercase">Version</span>
          <p className="text-xs font-black font-orbitron text-white">V8.0.2-RELEASE</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Device Model */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hardware Signature</label>
              <span className="text-[8px] text-cyan-500/40 font-bold">REQ: STRING</span>
            </div>
            <input
              type="text"
              placeholder="e.g. ROG PHONE 8 PRO"
              className="w-full bg-black/60 border border-cyan-500/20 rounded-sm px-5 py-4 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all text-white placeholder:text-slate-800 font-bold tracking-tight text-sm"
              value={config.deviceModel}
              onChange={(e) => setConfig({ ...config, deviceModel: e.target.value.toUpperCase() })}
            />
          </div>

          {/* Refresh Rate */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Refresh Frequency (Hz)</label>
            <div className="grid grid-cols-4 gap-2">
              {([60, 90, 120, 144] as RefreshRate[]).map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setConfig({ ...config, refreshRate: rate })}
                  className={`py-3 text-xs font-black font-orbitron border transition-all ${
                    config.refreshRate === rate 
                    ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_15px_rgba(0,242,255,0.4)]' 
                    : 'bg-black/40 text-slate-500 border-white/5 hover:border-cyan-500/50 hover:text-cyan-400'
                  }`}
                >
                  {rate}
                </button>
              ))}
            </div>
          </div>

          {/* Device Type */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OS Protocol</label>
            <div className="flex gap-2">
              {(['Android', 'iOS', 'PC/Emulator'] as DeviceType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setConfig({ ...config, deviceType: type })}
                  className={`flex-1 py-3 text-[10px] font-black font-orbitron border transition-all ${
                    config.deviceType === type 
                    ? 'bg-white text-black border-white' 
                    : 'bg-black/40 text-slate-500 border-white/5 hover:border-white/20'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* DPI */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Density (DPI)</label>
              <span className="text-[8px] text-cyan-500/40 font-bold">TYPE: INT</span>
            </div>
            <input
              type="number"
              className="w-full bg-black/60 border border-cyan-500/20 rounded-sm px-5 py-4 focus:outline-none focus:border-cyan-500 transition-all text-white font-bold"
              value={config.dpi}
              onChange={(e) => setConfig({ ...config, dpi: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        {/* Play Style */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Combat Heuristic</label>
          <div className="grid grid-cols-3 gap-4">
            {(['Aggressive', 'Balanced', 'Passive'] as PlayStyle[]).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setConfig({ ...config, playStyle: style })}
                className={`py-6 border transition-all relative overflow-hidden group ${
                  config.playStyle === style
                    ? 'border-cyan-500 bg-cyan-500/5'
                    : 'border-white/5 bg-black/40 hover:border-white/20'
                }`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full transition-all ${config.playStyle === style ? 'bg-cyan-500' : 'bg-transparent'}`}></div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${config.playStyle === style ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {style === 'Aggressive' ? 'RUSHER' : style === 'Passive' ? 'SNIPER' : 'GHOST'}
                </span>
                <div className="mt-1 text-[8px] text-slate-600 font-bold">
                  {style === 'Aggressive' ? 'CQC OPTIMIZED' : style === 'Passive' ? 'LR PRECISION' : 'VERSATILE'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full py-6 font-orbitron font-black text-lg tracking-[0.3em] transition-all relative overflow-hidden group ${
            isLoading ? 'opacity-50 cursor-not-allowed grayscale' : 'ff-gradient hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(0,242,255,0.2)]'
          }`}
        >
          <div className="relative z-10 flex items-center justify-center gap-4">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                CALIBRATING NEURAL CORE...
              </>
            ) : (
              'INITIALIZE V8 ENGINE'
            )}
          </div>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      </form>
    </div>
  );
};

export default SensitivityForm;
