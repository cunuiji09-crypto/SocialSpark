
import React, { useState } from 'react';
import { Palette, Wand2, Download, RefreshCw, Layers, AlertCircle } from 'lucide-react';
import { generateNanoBananaTemplate } from '../services/gemini.ts';

const TemplateGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState('Instagram');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const url = await generateNanoBananaTemplate(prompt, platform);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
      setError("Falha ao gerar imagem. Verifique se sua chave de API está correta e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 rounded-3xl shadow-xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
            <Palette size={24} />
          </div>
          <h2 className="text-2xl font-bold">Nano Banana Templates</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Descreva seu Visual</label>
              <textarea 
                rows={4}
                placeholder="Ex: Um fundo abstrato minimalista com tons de azul marinho e dourado para um post de tecnologia..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all text-slate-100 resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Formato</label>
              <div className="grid grid-cols-3 gap-3">
                {['Instagram', 'TikTok', 'Blog'].map((fmt) => (
                  <button 
                    key={fmt}
                    onClick={() => setPlatform(fmt)}
                    className={`py-3 rounded-xl border-2 transition-all font-medium ${
                      platform === fmt 
                      ? 'border-pink-500 bg-pink-500/10 text-pink-400' 
                      : 'border-slate-800 bg-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || !prompt}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-pink-600/30 flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="animate-spin" size={20} /> : <><Wand2 size={20} /> Gerar Template Visual</>}
            </button>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-900/50 rounded-3xl border border-slate-800 relative min-h-[400px]">
            {imageUrl ? (
              <div className="w-full h-full flex flex-col items-center animate-in zoom-in-95 duration-500">
                <img src={imageUrl} alt="Template" className="max-w-full rounded-2xl shadow-2xl border border-white/10" />
                <a 
                  href={imageUrl} 
                  download="social-fsk07-template.png"
                  className="mt-6 flex items-center gap-2 text-pink-400 hover:text-pink-300 font-semibold transition-colors bg-pink-400/10 px-6 py-2 rounded-full border border-pink-400/20"
                >
                  <Download size={18} /> Baixar Template
                </a>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="mb-4 inline-flex p-4 bg-slate-800 rounded-full text-slate-600">
                  <Layers size={40} />
                </div>
                <p className="text-slate-500 max-w-[200px] mx-auto">
                  {loading ? "O motor Nano Banana está criando sua arte..." : "Sua prévia aparecerá aqui assim que você clicar em gerar."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateGenerator;
