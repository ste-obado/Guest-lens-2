import React, { useState } from 'react';
import { GuestReport, GroundingChunk } from '../types';
import { 
  ShieldAlert, 
  BrainCircuit, 
  MessageSquare, 
  Users, 
  Target, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Fingerprint,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Copy,
  CheckCircle2
} from 'lucide-react';

interface ReportViewProps {
  report: GuestReport;
  sources: GroundingChunk[];
  guestName: string;
  onReset: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, sources, guestName, onReset }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'strategy' | 'questions'>('profile');

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
           <div className="flex items-center gap-3">
             <h1 className="text-3xl font-bold text-white tracking-tight">{guestName}</h1>
             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
               report.topicMode === 'Topic Aligned' 
                ? 'bg-indigo-950 border-indigo-800 text-indigo-300' 
                : 'bg-emerald-950 border-emerald-800 text-emerald-300'
             }`}>
               {report.topicMode}
             </span>
           </div>
           <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">{report.profile.summary}</p>
        </div>
        <button 
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg transition-colors"
        >
          New Analysis
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex space-x-1 bg-slate-900/50 p-1 rounded-xl border border-slate-800 backdrop-blur-sm sticky top-4 z-30">
        <TabButton 
          isActive={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<Fingerprint size={16} />} 
          label="Profile & Patterns" 
        />
        <TabButton 
          isActive={activeTab === 'strategy'} 
          onClick={() => setActiveTab('strategy')} 
          icon={<BrainCircuit size={16} />} 
          label="Strategic Intel" 
        />
        <TabButton 
          isActive={activeTab === 'questions'} 
          onClick={() => setActiveTab('questions')} 
          icon={<MessageSquare size={16} />} 
          label="Question Bank" 
        />
      </div>

      <div className="min-h-[60vh]">
        {activeTab === 'profile' && <ProfileTab report={report} sources={sources} />}
        {activeTab === 'strategy' && <StrategyTab report={report} />}
        {activeTab === 'questions' && <QuestionsTab report={report} />}
      </div>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const TabButton = ({ isActive, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    {icon}
    {label}
  </button>
);

const SectionHeader = ({ title, icon: Icon, color = "text-indigo-400" }: any) => (
  <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
    <Icon className={`w-5 h-5 ${color}`} />
    <h3 className="text-lg font-bold text-white uppercase tracking-wide">{title}</h3>
  </div>
);

/* --- TAB CONTENTS --- */

const ProfileTab = ({ report, sources }: { report: GuestReport, sources: GroundingChunk[] }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Core Identity */}
      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <SectionHeader title="Reputation Positioning" icon={Target} />
          <p className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-1">
            "{report.profile.reputationPositioning}"
          </p>
          
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Core Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {report.profile.coreExpertise.map((exp, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-md">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <SectionHeader title="Public Narrative Arc" icon={TrendingUp} />
          <p className="text-slate-300 text-sm">{report.profile.publicNarrative}</p>
          
          <div className="mt-6 space-y-3">
             <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inflection Points</h4>
             <ul className="space-y-2">
                {report.profile.inflectionPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>

      {/* Middle & Right: Narrative Analysis */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
            <SectionHeader title="Repeated Stories" icon={MessageSquare} color="text-emerald-400" />
            <ul className="space-y-3">
              {report.narrativeAnalysis.repeatedStories.map((story, i) => (
                <li key={i} className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded border border-slate-800/50">
                  {story}
                </li>
              ))}
            </ul>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
            <SectionHeader title="Industry Stances" icon={ShieldAlert} color="text-amber-400" />
            <ul className="space-y-3">
              {report.narrativeAnalysis.industryStances.map((stance, i) => (
                <li key={i} className="text-sm text-slate-300 bg-slate-950/50 p-3 rounded border border-slate-800/50">
                  {stance}
                </li>
              ))}
            </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
            <SectionHeader title="Emotional Anchors" icon={Fingerprint} color="text-pink-400" />
            <ul className="space-y-2">
              {report.narrativeAnalysis.emotionalAnchors.map((anchor, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                   <span className="text-pink-500 font-bold">•</span> {anchor}
                </li>
              ))}
            </ul>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full">
            <SectionHeader title="Avoided Areas / Defensive" icon={AlertTriangle} color="text-red-400" />
            <ul className="space-y-2">
              {report.narrativeAnalysis.avoidedAreas.map((area, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                   <span className="text-red-500 font-bold">•</span> {area}
                </li>
              ))}
            </ul>
        </div>
      </div>

      {/* Sources Footer */}
      {sources.length > 0 && (
         <div className="col-span-full mt-4">
            <h4 className="text-xs font-bold text-slate-600 uppercase mb-2">Intelligence Sources</h4>
            <div className="flex flex-wrap gap-3">
              {sources.map((source, idx) => (
                source.web && (
                  <a key={idx} href={source.web.uri} target="_blank" rel="noopener noreferrer" 
                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline truncate max-w-xs">
                    {source.web.title}
                  </a>
                )
              ))}
            </div>
         </div>
      )}
    </div>
  );
};

const StrategyTab = ({ report }: { report: GuestReport }) => {
  return (
    <div className="space-y-8">
      
      {/* Dynamic Header based on Mode */}
      {report.topicMode === 'Topic Aligned' && report.topicAlignment ? (
        <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-6">
           <SectionHeader title="Topic Alignment Strategy" icon={Target} color="text-indigo-400" />
           <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-indigo-200">Main Insights</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                  {report.topicAlignment.mainInsights.map((insight, i) => <li key={i}>{insight}</li>)}
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-indigo-200">Expansion Angles</h4>
                {report.topicAlignment.expansions.map((exp, i) => (
                  <div key={i} className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-900/30">
                    <p className="text-xs font-bold text-indigo-300 uppercase mb-1">{exp.angle}</p>
                    <p className="text-sm text-slate-300">{exp.description}</p>
                  </div>
                ))}
              </div>
           </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {report.proposedThemes?.map((theme, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-white text-lg">{theme.themeName}</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                   theme.riskLevel === 'Safe' ? 'bg-green-950 text-green-400 border-green-900' :
                   theme.riskLevel === 'Bold' ? 'bg-blue-950 text-blue-400 border-blue-900' :
                   'bg-orange-950 text-orange-400 border-orange-900'
                }`}>{theme.riskLevel}</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">{theme.reason}</p>
              
              <div className="space-y-3 mb-4">
                <div>
                   <span className="text-xs font-bold text-slate-500 uppercase">Value</span>
                   <p className="text-xs text-slate-300">{theme.strategicValue}</p>
                </div>
                <div>
                   <span className="text-xs font-bold text-slate-500 uppercase">Audience</span>
                   <p className="text-xs text-slate-300">{theme.audienceAppeal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deep Thinking Grid */}
      <div className="grid md:grid-cols-2 gap-6">
         <InsightCard title="Hidden Tensions" icon={Zap} items={report.strategicInsights.hiddenTensions} color="text-yellow-400" />
         <InsightCard title="Contradictions" icon={AlertTriangle} items={report.strategicInsights.contradictions} color="text-orange-400" />
         <InsightCard title="Assumptions to Challenge" icon={BrainCircuit} items={report.strategicInsights.assumptionsToChallenge} color="text-red-400" />
         <InsightCard title="Industry Myths" icon={ShieldAlert} items={report.strategicInsights.industryMyths} color="text-purple-400" />
         <div className="md:col-span-2">
            <InsightCard title="Uncomfortable Probes (The 'Edge')" icon={Fingerprint} items={report.strategicInsights.uncomfortableProbes} color="text-rose-500" />
         </div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, icon, items, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
    <SectionHeader title={title} icon={icon} color={color} />
    <ul className="space-y-3">
      {items.map((item: string, i: number) => (
        <li key={i} className="flex gap-3 text-sm text-slate-300">
           <span className={`${color} font-bold mt-1`}>›</span> 
           {item}
        </li>
      ))}
    </ul>
  </div>
);

const QuestionsTab = ({ report }: { report: GuestReport }) => {
  return (
    <div className="space-y-8">
      <QuestionCategory 
        title="Authority Building" 
        subtitle="Questions that let them shine and establish credibility."
        questions={report.questionBank.authorityBuilding} 
        color="border-indigo-500"
      />
      <QuestionCategory 
        title="Vulnerability & Deep Dive" 
        subtitle="Going below the surface to the human element."
        questions={report.questionBank.vulnerabilityDeepDive} 
        color="border-pink-500"
      />
      <QuestionCategory 
        title="Contrarian & Debate" 
        subtitle="Pushing back to create sparks and intellectual friction."
        questions={report.questionBank.contrarianDebate} 
        color="border-orange-500"
      />
      <QuestionCategory 
        title="Storytelling Triggers" 
        subtitle="Prompts designed to elicit specific, vivid anecdotes."
        questions={report.questionBank.storytellingTriggers} 
        color="border-emerald-500"
      />
      <QuestionCategory 
        title="Viral / Short Clip" 
        subtitle="Punchy questions aimed at creating shareable social media moments."
        questions={report.questionBank.viralShortClip} 
        color="border-red-500"
        isGrid
      />
    </div>
  );
};

const QuestionCategory = ({ title, subtitle, questions, color, isGrid = false }: any) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className={`bg-slate-900 border-l-4 ${color} border-y border-r border-slate-800 rounded-r-xl p-6`}>
      <div className="mb-5">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>

      <div className={isGrid ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
        {questions.map((q: string, i: number) => (
          <div key={i} className="group relative bg-slate-950 p-4 rounded-lg border border-slate-800 hover:border-slate-600 transition-all">
            <p className="text-slate-200 text-sm pr-8 leading-relaxed">{q}</p>
            <button 
              onClick={() => handleCopy(q, i)}
              className="absolute top-3 right-3 text-slate-600 hover:text-indigo-400 transition-colors"
              title="Copy to clipboard"
            >
              {copiedIndex === i ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportView;