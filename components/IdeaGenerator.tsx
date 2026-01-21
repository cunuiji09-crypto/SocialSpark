
import React, { useState } from 'react';
import { Lightbulb, Send, Copy, Check, Hash } from 'lucide-react';
import { generateIdeas } from '../services/gemini';
import { Platform, Style, ContentIdea } from '../types';

const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [style, setStyle] = useState<Style>('Educativo');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const result = await generateIdeas(niche, platform, style);
      setIdeas(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
            <Lightbulb size={24} />
          </div>
          <h2 className="text-2xl font-bold">Gerador de Ideias Criativas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">Nicho ou Tópico</label>
            <input 
              type="text" 
              placeholder="Ex: Vida Saudável, Tecnologia..." 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-100 placeholder:text-slate-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">Plataforma</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-100 appearance-none cursor-pointer"
            >
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="YouTube">YouTube</option>
              <option value="Blog">Blog</option>
              <option value="Twitter">Twitter</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">Estilo</label>
            <select 
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-100 appearance-none cursor-pointer"
            >
              <option value="Educativo">Educativo</option>
              <option value="Humorístico">Humorístico</option>
              <option value="Inspirador">Inspirador</option>
              <option value="Informativo">Informativo</option>
            </select>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading || !niche}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group"
        >
          {loading ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Gerar Sugestões <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          {ideas.map((idea, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl border-indigo-500/20 hover:border-indigo-500/50 transition-all flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full uppercase tracking-tighter">
                  {platform}
                </span>
                <button 
                  onClick={() => copyToClipboard(idea.title, idx)}
                  className="text-slate-500 hover:text-indigo-400 transition-colors"
                >
                  {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-100">{idea.title}</h3>
              <p className="text-sm text-indigo-400 font-semibold mb-3 italic">"Hook: {idea.hook}"</p>
              <p className="text-slate-400 text-sm mb-6 flex-1">{idea.description}</p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
                {idea.hashtags.map((tag, hIdx) => (
                  <span key={hIdx} className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-1 rounded-md flex items-center gap-1">
                    <Hash size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
