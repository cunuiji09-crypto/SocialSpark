
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Monitor, Instagram, Youtube, FileText, Twitter } from 'lucide-react';
import { generateWeeklyCalendar } from '../services/gemini.ts';
import { CalendarDay } from '../types.ts';

const ContentCalendar: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<CalendarDay[]>([]);

  const handleGenerate = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const data = await generateWeeklyCalendar(niche);
      setSchedule(data);
    } catch (error) {
      console.error("Erro ao gerar calendário:", error);
      alert("Houve um erro ao gerar o calendário. Verifique sua conexão ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('instagram')) return <Instagram size={18} className="text-pink-400" />;
    if (p.includes('youtube')) return <Youtube size={18} className="text-red-400" />;
    if (p.includes('blog')) return <FileText size={18} className="text-blue-400" />;
    if (p.includes('twitter')) return <Twitter size={18} className="text-sky-400" />;
    return <Monitor size={18} className="text-slate-400" />;
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-3xl shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Calendar size={24} />
            </div>
            <h2 className="text-2xl font-bold">Calendário Semanal</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Seu nicho..." 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading || !niche}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-xl text-sm transition-all"
            >
              {loading ? "Planejando..." : "Planejar Semana"}
            </button>
          </div>
        </div>

        {schedule.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {schedule.map((day, i) => (
              <div key={i} className="glass-card p-4 rounded-2xl border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col min-h-[160px]">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{day.day}</div>
                <div className="bg-slate-800 p-2 rounded-lg w-fit mb-3">
                  {getIcon(day.platform)}
                </div>
                <p className="text-sm font-medium text-slate-200 line-clamp-4 leading-snug">
                  {day.idea}
                </p>
                <button className="mt-auto pt-4 flex items-center gap-1 text-[10px] text-indigo-400 font-bold hover:text-indigo-300 transition-colors uppercase">
                  <Plus size={10} /> Ver Detalhes
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-3xl p-16 text-center">
            <Calendar size={48} className="mx-auto text-slate-700 mb-4" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">Calendário Vazio</h3>
            <p className="text-slate-600 max-w-sm mx-auto">Insira seu nicho acima para receber uma estratégia de conteúdo completa para os próximos 7 dias.</p>
          </div>
        )}
      </div>

      <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold mb-1">Deseja uma estratégia mais profunda?</h4>
          <p className="text-slate-400 text-sm">Nossa IA pode criar scripts detalhados para cada um desses dias.</p>
        </div>
        <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-all whitespace-nowrap">
          Upgrade para Creator Pro
        </button>
      </div>
    </div>
  );
};

export default ContentCalendar;
