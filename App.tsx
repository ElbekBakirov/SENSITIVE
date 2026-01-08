
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SensitivityForm from './components/SensitivityForm';
import ResultDisplay from './components/ResultDisplay';
import LoadingScreen from './components/LoadingScreen';
import ProPresets from './components/ProPresets';
import { UserConfig, GenerateSensiResponse, FFTrend } from './types';
import { generateSensiSettings, fetchFFTrends } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'pro'>('generator');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSensiResponse | null>(null);
  const [trends, setTrends] = useState<FFTrend[]>([]);

  useEffect(() => {
    fetchFFTrends().then(setTrends);
  }, []);

  const handleGenerate = async (config: UserConfig) => {
    setLoading(true);
    try {
      const data = await generateSensiSettings(config);
      setResult(data);
    } catch (err: any) {
      console.error("Neural core error during calibration", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-cyan-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.02)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* Neural Ticker */}
      <div className="bg-cyan-950/20 border-b border-cyan-500/10 py-2 overflow-hidden whitespace-nowrap relative z-50">
        <div className="flex animate-[marquee_50s_linear_infinite] gap-16 items-center">
          {trends.length > 0 ? trends.map((t, i) => (
            <span key={i} className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-cyan-500"></span>
              {t.title} :: {t.description}
            </span>
          )) : (
            <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
              ESTABLISHING LINK... NEURAL CORE V8 ONLINE... STANDBY FOR INSTRUCTIONS...
            </span>
          )}
        </div>
      </div>

      <Header />

      <main className="flex-grow container mx-auto px-6 py-12 relative z-10">
        {!result && !loading && (
          <div className="flex justify-center mb-16">
            <div className="bg-black/60 p-1.5 border border-white/5 flex gap-2">
              <button 
                onClick={() => setActiveTab('generator')}
                className={`px-10 py-4 text-[10px] font-black font-orbitron tracking-[0.2em] transition-all border ${activeTab === 'generator' ? 'bg-white text-black border-white' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
              >
                V8 GENERATOR
              </button>
              <button 
                onClick={() => setActiveTab('pro')}
                className={`px-10 py-4 text-[10px] font-black font-orbitron tracking-[0.2em] transition-all border ${activeTab === 'pro' ? 'bg-white text-black border-white' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
              >
                ELITE ARCHIVE
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <LoadingScreen />
        ) : result ? (
          <ResultDisplay data={result} onReset={() => setResult(null)} />
        ) : activeTab === 'generator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7 space-y-12">
              <div className="animate-fade-in">
                <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black tracking-widest mb-6">
                  NEW_VERSION :: 8.0.2
                </div>
                <h2 className="text-6xl md:text-8xl font-orbitron font-black mb-6 uppercase tracking-tighter leading-none italic">
                  NEURAL <br /><span className="ff-gradient bg-clip-text text-transparent">TARGETING</span>
                </h2>
                <p className="text-slate-400 text-sm max-w-md mb-12 font-medium tracking-tight">
                  Professional-grade aiming heuristics powered by local neural simulation. Achieve pixel-perfect drag shots on any mobile hardware.
                </p>
                <SensitivityForm onGenerate={handleGenerate} isLoading={loading} />
              </div>
            </div>

            <div className="lg:col-span-5 pt-20">
              <div className="glass p-8 rounded-sm cyber-border bg-black/40">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-[10px] font-black font-orbitron text-cyan-500 uppercase tracking-[0.3em]">Neural Feed</h3>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></span>
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                  </div>
                </div>
                <div className="space-y-6">
                  {trends.map((trend, i) => (
                    <div key={i} className="p-5 border-l-2 border-white/5 bg-white/5 hover:border-cyan-500/50 hover:bg-white/[0.07] transition-all cursor-pointer group">
                      <h4 className="font-bold text-sm text-slate-100 mb-1 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{trend.title}</h4>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-relaxed uppercase">{trend.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ProPresets />
        )}
      </main>

      <footer className="py-12 text-center opacity-20 border-t border-white/5">
        <p className="text-[8px] font-orbitron tracking-[1em] text-white">NEURAL AIM V8 // ELITE CORE ENGINE // BUILT FOR SPEED</p>
      </footer>
    </div>
  );
};

export default App;
