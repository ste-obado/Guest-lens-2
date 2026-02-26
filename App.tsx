import React, { useState } from 'react';
import { generateGuestReport } from './services/geminiService';
import InputForm from './components/InputForm';
import ReportView from './components/ReportView';
import { GuestReport, GroundingChunk } from './types';
import { Radio } from 'lucide-react';

const App: React.FC = () => {
  const [report, setReport] = useState<GuestReport | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [guestName, setGuestName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: { name: string; website: string; linkedin: string; context: string; topic: string }) => {
    setIsLoading(true);
    setError(null);
    setGuestName(data.name);

    try {
      const result = await generateGuestReport(
        data.name,
        data.website,
        data.linkedin,
        data.context,
        data.topic
      );
      setReport(result.data);
      setSources(result.sources);
    } catch (err) {
      setError("Failed to generate report. Please check your API key or try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setGuestName("");
    setSources([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Radio className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">GuestLens</span>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs font-medium text-slate-500 uppercase tracking-widest hidden sm:block">Strategic Interview Protocol</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="max-w-3xl mx-auto mb-8 bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3">
             <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {!report ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
             <div className="w-full max-w-4xl">
               <div className="text-center mb-10 space-y-4">
                 <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                   Unlock Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Interview Intelligence</span>
                 </h1>
                 <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                   Transform basic guest research into high-level strategic dossiers. 
                   Identify hidden tensions, deep narratives, and questions that make headlines.
                 </p>
               </div>
               <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
             </div>
          </div>
        ) : (
          <ReportView 
            report={report} 
            sources={sources}
            guestName={guestName} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-auto py-8 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} GuestLens Tool. Built for High-Stakes Conversations.</p>
      </footer>
    </div>
  );
};

export default App;