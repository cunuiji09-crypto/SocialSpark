
import React, { useState, useEffect } from 'react';
import { Sparkles, Info, Trophy, Bookmark } from 'lucide-react';
import { fetchCuriosities } from '../services/gemini';
import { Curiosity } from '../types';

const InspirationFeed: React.FC = () => {
  const [curiosities, setCuriosities] = useState<Curiosity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCuriosities();
        setCuriosities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
            <Sparkles size={24} />
          </div>
          <h2 className="text-2xl font-bold">Inspiração e Curiosidades</h2>
        </div>
        <p className="text-slate-400">Fatos fascinantes sobre como as pessoas consomem conteúdo digital.</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-8 rounded-3xl h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {curiosities.map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-3xl border-purple-500/20 group hover:-translate-y-1 transition-transform">
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full mb-6 inline-block">
                {item.category}
              </span>
              <h3 className="text-xl font-bold mb-4 text-slate-100">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 italic">"{item.fact}"</p>
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-500">
                <div className="flex items-center gap-1 text-xs">
                  <Info size={14} /> Fato de Marketing
                </div>
                <Bookmark size={16} className="cursor-pointer hover:text-purple-400" />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-indigo-900/30">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="text-amber-400" size={32} />
            <h3 className="text-2xl font-bold">Campanha em Destaque</h3>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
            <h4 className="font-bold text-lg mb-2">Nike: Dream Crazy</h4>
            <p className="text-slate-400 text-sm mb-4">
              Uma das campanhas mais icônicas focadas em propósito. Ensinou que o branding moderno exige posicionamento autêntico, mesmo que gere controvérsia.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500">Branding</span>
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500">Storytelling</span>
              <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-500">Viral</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6">Dica Rápida de Storytelling</h3>
          <div className="space-y-4">
            <p className="text-slate-300">
              <span className="text-indigo-400 font-bold">1. Conflito:</span> Comece com um problema real da sua audiência.
            </p>
            <p className="text-slate-300">
              <span className="text-indigo-400 font-bold">2. Virada:</span> Mostre como sua solução ou perspectiva mudou as coisas.
            </p>
            <p className="text-slate-300">
              <span className="text-indigo-400 font-bold">3. Lição:</span> Termine com uma chamada de ação ou uma lição prática.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspirationFeed;
