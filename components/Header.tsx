
import React from 'react';

const Header: React.FC = () => {
  const isAiActive = process.env.API_KEY && process.env.API_KEY !== "undefined" && process.env.API_KEY.length > 10;

  return (
    <header className="py-5 px-6 md:px-12 flex items-center justify-between glass border-b border-cyan-500/20 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <div className="w-12 h-12 ff-gradient rounded-sm flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.3)] group-hover:rotate-45 transition-transform duration-500">
            <svg className="w-7 h-7 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14H11V21L20 10H13Z" />
            </svg>
          </div>
          <div className="absolute -inset-1 bg-cyan-500 rounded-sm blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </div>
        <div>
          <h1 className="text-xl md:text-3xl font-orbitron font-black tracking-tighter ff-gradient bg-clip-text text-transparent italic leading-none">
            NEURAL AIM V8
          </h1>
          <p className="text-[10px] text-cyan-500/60 font-black tracking-[0.4em] mt-1">ELITE CORE INTERFACE</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">System Status</span>
          <div className="flex items-center gap-2 px-3 py-1 rounded-sm bg-black/40 border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${isAiActive ? 'bg-cyan-400 shadow-[0_0_8px_#00f2ff]' : 'bg-rose-500 shadow-[0_0_8px_#ff0055]'}`}></div>
            <span className="text-[9px] font-black font-orbitron text-slate-300">
              {isAiActive ? 'HYPERLINK ACTIVE' : 'LOCAL NEURAL CALIB'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
