
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Palette, 
  TrendingUp, 
  Lightbulb, 
  LayoutDashboard,
  Zap,
  ChevronRight,
  Rocket,
  Key,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import IdeaGenerator from './components/IdeaGenerator.tsx';
import TemplateGenerator from './components/TemplateGenerator.tsx';
import EngagementHub from './components/EngagementHub.tsx';
import InspirationFeed from './components/InspirationFeed.tsx';
import ContentCalendar from './components/ContentCalendar.tsx';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasKey, setHasKey] = useState<boolean>(true);

  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    }
  };

  const handleOpenKeySelector = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume sucesso para evitar race condition
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'ideas':
        return <IdeaGenerator />;
      case 'templates':
        return <TemplateGenerator />;
      case 'engagement':
        return <EngagementHub />;
      case 'inspiration':
        return <InspirationFeed />;
      case 'calendar':
        return <ContentCalendar />;
      default:
        return <Dashboard onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0f172a] text-slate-100">
      {/* Sidebar / Navigation */}
      <nav className="w-full md:w-72 glass-card border-r border-slate-800 p-6 flex flex-col gap-8 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 spark-gradient rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Social<span className="text-purple-400">Spark</span>
          </h1>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4 mb-2">Menu Principal</p>
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
          />
          <NavButton 
            active={activeTab === 'ideas'} 
            onClick={() => setActiveTab('ideas')} 
            icon={<Lightbulb size={20} />} 
            label="Gerador de Ideias" 
          />
          <NavButton 
            active={activeTab === 'templates'} 
            onClick={() => setActiveTab('templates')} 
            icon={<Palette size={20} />} 
            label="Nano Templates" 
          />
          <NavButton 
            active={activeTab === 'engagement'} 
            onClick={() => setActiveTab('engagement')} 
            icon={<TrendingUp size={20} />} 
            label="Hub de Engajamento" 
          />
          <NavButton 
            active={activeTab === 'calendar'} 
            onClick={() => setActiveTab('calendar')} 
            icon={<Calendar size={20} />} 
            label="Calendário Editorial" 
          />
          <NavButton 
            active={activeTab === 'inspiration'} 
            onClick={() => setActiveTab('inspiration')} 
            icon={<Sparkles size={20} />} 
            label="Feed de Inspiração" 
          />
        </div>

        <div className="mt-auto space-y-4">
          {!hasKey && (
            <button 
              onClick={handleOpenKeySelector}
              className="w-full flex items-center gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-xl hover:bg-amber-500/20 transition-all text-sm font-medium animate-pulse"
            >
              <Key size={18} />
              <span>Conectar API Key</span>
            </button>
          )}
          
          <div className="p-4 glass-card rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-indigo-300 font-semibold uppercase tracking-wider">Status da API</p>
              <div className={`w-2 h-2 rounded-full ${hasKey ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            </div>
            <p className="text-xs text-slate-400 mb-3">Chave de API necessária para modelos avançados de IA.</p>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              className="text-[10px] flex items-center gap-1 text-slate-500 hover:text-white transition-colors"
            >
              Configurar Faturamento <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-h-screen relative">
        {!hasKey && activeTab !== 'dashboard' && (
           <div className="absolute inset-0 z-10 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center p-6">
              <div className="max-w-md w-full glass-card p-8 rounded-3xl text-center border-amber-500/30">
                <AlertTriangle className="text-amber-500 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold mb-2">Conexão Necessária</h3>
                <p className="text-slate-400 mb-6">Para gerar conteúdo criativo com o Gemini 3, você precisa conectar sua chave de API do Google AI Studio.</p>
                <button 
                  onClick={handleOpenKeySelector}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20"
                >
                  Configurar Agora
                </button>
              </div>
           </div>
        )}
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
      {icon}
    </span>
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const Dashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-500">
    <header className="mb-12">
      <div className="inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
        Beta Access • Gemini 3 powered
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Crie conteúdo que <span className="gradient-text">conecta e brilha.</span></h2>
      <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
        Sua central criativa para blogs, redes sociais e vídeos. Use o poder da IA generativa para nunca mais ficar sem ideias.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Ideias Virais"
        description="Sugestões personalizadas baseadas no seu nicho e plataforma."
        icon={<Lightbulb className="text-amber-400" />}
        onClick={() => onNavigate('ideas')}
        gradient="from-amber-500/10 to-orange-500/10"
      />
      <DashboardCard 
        title="Nano Templates"
        description="Designers de IA criam visuais exclusivos para seus posts."
        icon={<Palette className="text-pink-400" />}
        onClick={() => onNavigate('templates')}
        gradient="from-pink-500/10 to-rose-500/10"
      />
      <DashboardCard 
        title="Estratégia de Hub"
        description="Títulos, hashtags e descrições otimizadas para SEO."
        icon={<TrendingUp className="text-emerald-400" />}
        onClick={() => onNavigate('engagement')}
        gradient="from-emerald-500/10 to-teal-500/10"
      />
      <DashboardCard 
        title="Calendário 7 Dias"
        description="Planejamento completo da sua semana em segundos."
        icon={<Calendar className="text-indigo-400" />}
        onClick={() => onNavigate('calendar')}
        gradient="from-indigo-500/10 to-blue-500/10"
      />
      <DashboardCard 
        title="Insights & Fatos"
        description="Aprenda o que faz um conteúdo ser compartilhado."
        icon={<Sparkles className="text-purple-400" />}
        onClick={() => onNavigate('inspiration')}
        gradient="from-purple-500/10 to-fuchsia-500/10"
      />
      <div className="glass-card rounded-3xl p-8 flex flex-col justify-center items-center text-center border-dashed border-2 border-slate-700 bg-slate-800/20 group">
        <Rocket className="text-slate-500 mb-4 group-hover:text-indigo-400 group-hover:-translate-y-2 transition-all" size={40} />
        <h3 className="text-xl font-bold mb-2">Social Spark Pro</h3>
        <p className="text-sm text-slate-500">Recursos ilimitados e modelos de vídeo em breve.</p>
      </div>
    </div>
  </div>
);

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  gradient: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, onClick, gradient }) => (
  <button 
    onClick={onClick}
    className={`glass-card p-8 rounded-3xl text-left hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group relative overflow-hidden`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
    <div className="relative z-10">
      <div className="mb-6 p-3 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform shadow-inner border border-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex items-center text-indigo-400 font-semibold text-sm">
        Abrir Ferramenta <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </button>
);

export default App;
