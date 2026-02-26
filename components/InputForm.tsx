import React, { useState } from 'react';
import { Search, Globe, Linkedin, FileText, Mic, Sparkles } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: { name: string; website: string; linkedin: string; context: string; topic: string }) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [context, setContext] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, website, linkedin, context, topic });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Initialize Research
          </h2>
          <p className="text-slate-400 text-sm mt-1">Configure your target for deep intelligence analysis.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Guest Name */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Guest Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g. Naval Ravikant"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Website */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Website (Optional)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="domain.com"
                />
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">LinkedIn (Optional)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400" />
                </div>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="linkedin.com/in/..."
                />
              </div>
            </div>
          </div>

          {/* Context / Bio / Transcript */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
              Context / Bio / Notes (Optional)
            </label>
            <div className="relative group">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FileText className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400" />
              </div>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[100px]"
                placeholder="Paste short bio, specific achievements, or notes here to help the AI..."
              />
            </div>
          </div>

          {/* Episode Topic */}
          <div className="space-y-1">
             <label className="flex items-center justify-between text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                <span>Specific Episode Topic</span>
                <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full">Leave blank for General Discovery</span>
             </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mic className="h-5 w-5 text-slate-500 group-focus-within:text-indigo-400" />
              </div>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g. The Future of Crypto Regulation, or Scaling to $10M ARR"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-lg font-bold text-lg tracking-wide transition-all duration-300 transform 
              ${isLoading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/40 hover:scale-[1.01] active:scale-[0.99]'
              }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                Initializing Intelligence Protocol...
              </>
            ) : (
              'Generate Intelligence Report'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;