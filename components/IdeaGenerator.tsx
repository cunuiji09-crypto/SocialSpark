
import React, { useState, useEffect } from 'react';
import { Lightbulb, Send, Copy, Check, Hash, Bookmark, BookmarkCheck, Trash2 } from 'lucide-react';
import { generateIdeas } from '../services/gemini.ts';
import { Platform, Style, ContentIdea } from '../types.ts';

interface SavedIdea extends ContentIdea {
  id: string;
  platform: Platform;
  savedAt: number;
}

const IdeaGenerator: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [platform, setPlatform] = useState<Platform>('Instagram');
  const [style, setStyle] = useState<Style>('Educativo');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | string | null>(null);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('social-spark-saved-ideas');
    if (stored) {
      try {
        setSavedIdeas(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading saved ideas", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('social-spark-saved-ideas', JSON.stringify(savedIdeas));
  }, [savedIdeas]);

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

  const copyToClipboard = (text: string, index: number | string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleSaveIdea = (idea: ContentIdea) => {
    const ideaId = `${idea.title}-${platform}`;
    const isSaved = savedIdeas.find(s => s.id === ideaId);

    if (isSaved) {
      setSavedIdeas(savedIdeas.filter(s => s.id !== ideaId));
    } else {
      const newSavedIdea: SavedIdea = {
        ...idea,
        id: ideaId,
        platform: platform,
        savedAt: Date.now()
      };
      setSavedIdeas([newSavedIdea, ...savedIdeas]);
    }
  };

  const removeSavedIdea = (id: string) => {
    setSavedIdeas(savedIdeas.filter(s => s.id !== id));
  };

  const isIdeaSaved = (title: string) => {
    return savedIdeas.some(s => s.title === title && s.platform === platform);
  };

  return (
    <div className="space-y-12">
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
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold px-2 flex items-center gap-2">
            <Zap className="text-yellow-400" size={20} /> Sugestões Geradas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, idx) => {
              const saved = isIdeaSaved(idea.title);
              return (
                <div key={idx} className="glass-card p-6 rounded-3xl border-indigo-500/20 hover:border-indigo-500/50 transition-all flex flex-col h-full relative group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full uppercase tracking-tighter">
                      {platform}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(idea.title, idx)}
                        className="p-2 bg-slate-800 rounded-lg text-slate-500 hover:text-indigo-400 transition-colors"
                        title="Copiar título"
                      >
                        {copiedIndex === idx ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                      <button 
                        onClick={() => toggleSaveIdea(idea)}
                        className={`p-2 rounded-lg transition-colors ${saved ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500 hover:text-indigo-400'}`}
                        title={saved ? "Remover dos salvos" : "Salvar ideia"}
                      >
                        {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                      </button>
                    </div>
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
              );
            })}
          </div>
        </div>
      )}

      {savedIdeas.length > 0 && (
        <div className="pt-10 border-t border-slate-800 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Bookmark className="text-indigo-400" size={20} /> Ideias Salvas
            </h3>
            <span className="text-xs text-slate-500 font-medium bg-slate-800 px-3 py-1 rounded-full">
              {savedIdeas.length} {savedIdeas.length === 1 ? 'ideia' : 'ideias'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedIdeas.map((idea) => (
              <div key={idea.id} className="glass-card p-6 rounded-3xl border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 transition-all flex flex-col h-full opacity-90 hover:opacity-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-700 text-slate-400 rounded-md uppercase tracking-widest">
                    {idea.platform}
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => copyToClipboard(idea.title, 'saved-' + idea.id)}
                      className="p-1.5 text-slate-500 hover:text-indigo-400 transition-colors"
                    >
                      {copiedIndex === 'saved-' + idea.id ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <button 
                      onClick={() => removeSavedIdea(idea.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-200">{idea.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-3 mb-4">{idea.description}</p>
                <div className="mt-auto flex justify-between items-center text-[10px] text-slate-500 pt-4 border-t border-slate-700/30">
                   <span>Salvo em {new Date(idea.savedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Zap = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 14.71 14.71 4l-1.42 1.42L20 14.71l-10.71 10.71 1.42-1.42L4 14.71z" />
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export default IdeaGenerator;
