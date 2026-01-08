
import React, { useState } from 'react';
import { GenerateSensiResponse } from '../types';

interface Props {
  data: GenerateSensiResponse;
  onReset: () => void;
}

const ResultDisplay: React.FC<Props> = ({ data, onReset }) => {
  const { settings, explanation, source } = data;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `V8-ELITE: Gen:${settings.general} | RD:${settings.redDot} | 2x:${settings.scope2x} | 4x:${settings.scope4x} | Snip:${settings.sniperScope}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Panel */}
        <div className="lg:col-span-3 glass p-10 rounded-sm cyber-border bg-black/80 relative overflow-hidden">
          {/* Subtle bg art */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <div className="w-64 h-64 border-[20px] border-cyan-500 rounded-full"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-cyan-500 text-black text-[9px] font-black tracking-widest">DATA EXTRACTED</span>
                <span className="px-2 py-0.5 border border-cyan-500/40 text-cyan-500 text-[9px] font-black tracking-widest uppercase">{source}</span>
              </div>
              <h3 className="text-4xl font-orbitron font-black text-white italic tracking-tighter">ELITE PAYLOAD</h3>
            </div>
            <button 
              onClick={handleCopy} 
              className="px-8 py-3 bg-white text-black text-xs font-black font-orbitron tracking-widest hover:bg-cyan-400 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              {copied ? 'BUFFERED' : 'EXTRACT DATA'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 relative z-10">
            {[
              { label: 'General / 200', val: settings.general, color: 'cyan' },
              { label: 'Red Dot / 200', val: settings.redDot, color: 'rose' },
              { label: '2x Scope / 200', val: settings.scope2x, color: 'indigo' },
              { label: '4x Scope / 200', val: settings.scope4x, color: 'purple' },
              { label: 'Sniper Scope', val: settings.sniperScope, color: 'emerald' },
              { label: 'Free Look', val: settings.freeLook, color: 'amber' },
            ].map((s) => (
              <div key={s.label} className="group relative">
                <div className="absolute -inset-2 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">{s.label}</span>
                <div className={`text-5xl font-orbitron font-black tracking-tighter text-white transition-all`}>
                  {s.val}<span className="text-lg text-slate-600 ml-1">#</span>
                </div>
                <div className="w-full bg-slate-900 h-0.5 mt-4">
                  <div 
                    className={`h-full bg-cyan-500 shadow-[0_0_10px_#00f2ff] transition-all duration-1000`} 
                    style={{ width: `${(s.val / 200) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="space-y-8 lg:col-span-1">
          <div className="glass p-6 rounded-sm cyber-border bg-black/40">
            <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-6 border-b border-cyan-500/20 pb-2">Analysis Log</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
              "{explanation}"
            </p>
          </div>

          <div className="glass p-6 rounded-sm border border-white/5 bg-black/20">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Optimized For</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-500">ENGINE</span>
                <span className="text-cyan-400">V8 HYPER-V</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-500">FPS REGEN</span>
                <span className="text-emerald-500">{settings.fpsSetting}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-500">POST-PROCESS</span>
                <span className="text-slate-300">{settings.graphicSettings}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Tips Section */}
      <div className="glass p-10 rounded-sm cyber-border border-white/5">
        <h4 className="text-xs font-black text-white uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
          <span className="w-10 h-0.5 bg-cyan-500"></span>
          NEURAL OPTIMIZATION TIPS
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {settings.proTips.map((tip, i) => (
            <div key={i} className="relative p-5 bg-white/5 border border-white/5 hover:border-cyan-500/40 transition-all group">
              <div className="absolute top-0 left-0 text-[8px] font-black p-1 text-cyan-500/40 bg-white/5">LOG_0{i+1}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-4 group-hover:text-slate-200 transition-colors">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onReset} 
          className="px-16 py-5 bg-black border border-white text-white font-orbitron font-black tracking-[0.4em] hover:bg-white hover:text-black transition-all text-sm uppercase"
        >
          Reset Core
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
