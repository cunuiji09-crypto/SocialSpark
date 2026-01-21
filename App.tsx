
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
  Plus,
  Rocket
} from 'lucide-react';
import IdeaGenerator from './components/IdeaGenerator';
import TemplateGenerator from './components/TemplateGenerator';
import EngagementHub from './components/EngagementHub';
import InspirationFeed from './components/InspirationFeed';
import ContentCalendar from './components/ContentCalendar';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
      <nav className="w-full md:w-64 glass-card border-r border-slate-800 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 spark-gradient rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            Social<span className="text-purple-400">Spark</span>
          </h1>
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutDashboard size={20} />} 
            label="Início" 
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
            label="Engajamento" 
          />
          <NavButton 
            active={activeTab === 'calendar'} 
            onClick={() => setActiveTab('calendar')} 
            icon={<Calendar size={20} />} 
            label="Calendário" 
          />
          <NavButton 
            active={activeTab === 'inspiration'} 
            onClick={() => setActiveTab('inspiration')} 
            icon={<Sparkles size={20} />} 
            label="Inspiração" 
          />
        </div>

        <div className="mt-auto p-4 glass-card rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
          <p className="text-xs text-indigo-300 font-semibold mb-2 uppercase tracking-wider">Pro Tip</p>
          <p className="text-sm text-slate-400">Use os Nano Templates para criar visuais virais em segundos.</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto max-h-screen">
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
    <span className="font-medium">{label}</span>
  </button>
);

const Dashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-500">
    <header className="mb-12">
      <h2 className="text-4xl font-extrabold mb-4">Bem-vindo ao <span className="gradient-text">Social Spark</span></h2>
      <p className="text-slate-400 text-lg max-w-2xl">
        Sua central de criatividade movida a IA. Escolha uma ferramenta abaixo para começar a criar seu próximo post viral.
      </p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard 
        title="Gerar Novas Ideias"
        description="Receba sugestões personalizadas para qualquer plataforma e estilo."
        icon={<Lightbulb className="text-amber-400" />}
        onClick={() => onNavigate('ideas')}
        gradient="from-amber-500/10 to-orange-500/10"
      />
      <DashboardCard 
        title="Nano Templates"
        description="Crie visuais originais com o motor de imagem Nano Banana."
        icon={<Palette className="text-pink-400" />}
        onClick={() => onNavigate('templates')}
        gradient="from-pink-500/10 to-rose-500/10"
      />
      <DashboardCard 
        title="Hub de Engajamento"
        description="Títulos virais, hashtags e otimização de descrição."
        icon={<TrendingUp className="text-emerald-400" />}
        onClick={() => onNavigate('engagement')}
        gradient="from-emerald-500/10 to-teal-500/10"
      />
      <DashboardCard 
        title="Meu Calendário"
        description="Planeje sua semana com recomendações de posts diários."
        icon={<Calendar className="text-indigo-400" />}
        onClick={() => onNavigate('calendar')}
        gradient="from-indigo-500/10 to-blue-500/10"
      />
      <DashboardCard 
        title="Inspiração & Fatos"
        description="Curiosidades do marketing e dicas de storytelling."
        icon={<Sparkles className="text-purple-400" />}
        onClick={() => onNavigate('inspiration')}
        gradient="from-purple-500/10 to-fuchsia-500/10"
      />
      <div className="glass-card rounded-3xl p-8 flex flex-col justify-center items-center text-center border-dashed border-2 border-slate-700">
        <Rocket className="text-slate-500 mb-4" size={40} />
        <h3 className="text-xl font-bold mb-2">Pronto para decolar?</h3>
        <p className="text-sm text-slate-500">Explore todas as ferramentas e revolucione seu conteúdo.</p>
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
      <div className="mb-6 p-3 bg-slate-800 rounded-2xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-300 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex items-center text-indigo-400 font-semibold text-sm">
        Começar agora <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </button>
);

export default App;
