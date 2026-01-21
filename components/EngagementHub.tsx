
import React, { useState } from 'react';
import { TrendingUp, Search, Hash, MessageSquare, ListCheck, Copy } from 'lucide-react';
import { generateEngagementTools } from '../services/gemini.ts';

const EngagementHub: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const data = await generateEngagementTools(topic);
      setResults(data);
    } catch (error) {
      console.error("Erro ao gerar ferramentas de engajamento:", error);
      alert("Erro ao processar sua solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <TrendingUp size={24} />
          </div>
          <h2 className="text-2xl font-bold">Ferramentas de Engajamento</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Qual o assunto principal do seu post?" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all text-slate-100"
            />
          </div>
          <button 
            onClick={handleAnalyze}
            disabled={loading || !topic}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/30"
          >
            {loading ? "Analisando..." : "Gerar Estratégia"}
          </button>
        </div>

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-700">
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">
                  <MessageSquare size={16} /> Títulos Virais
                </h3>
                <div className="space-y-2">
                  {results.viralTitles.map((title: string, i: number) => (
                    <div key={i} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700 flex justify-between items-center">
                      <span className="text-sm font-medium">{title}</span>
                      <button onClick={() => navigator.clipboard.writeText(title)} className="text-slate-500 hover:text-emerald-400 transition-colors">
                        <Copy size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">
                  <Hash size={16} /> Hashtags Estratégicas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.hashtags.map((tag: string, i: number) => (
                    <span key={i} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4 uppercase text-xs tracking-widest">
                  <ListCheck size={16} /> Descrição Otimizada
                </h3>
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {results.optimizedDescription}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Dicas de Alcance</h3>
                <ul className="space-y-3">
                  {results.engagementTips.map((tip: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-400">
                      <div className="min-w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngagementHub;
