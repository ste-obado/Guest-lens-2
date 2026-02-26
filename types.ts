export interface Theme {
  themeName: string;
  reason: string;
  strategicValue: string;
  audienceAppeal: string;
  riskLevel: 'Safe' | 'Bold' | 'Controversial' | 'High-Risk';
  questions: string[];
}

export interface ExpansionAngle {
  angle: string;
  description: string;
}

export interface ExecutiveProfile {
  summary: string;
  inflectionPoints: string[];
  coreExpertise: string[];
  publicNarrative: string;
  reputationPositioning: string;
}

export interface NarrativeAnalysis {
  repeatedStories: string[];
  achievements: string[];
  emotionalAnchors: string[];
  avoidedAreas: string[];
  languagePatterns: string[];
  industryStances: string[];
}

export interface StrategicInsights {
  hiddenTensions: string[];
  contradictions: string[];
  pressureTestAngles: string[];
  assumptionsToChallenge: string[];
  industryMyths: string[];
  uncomfortableProbes: string[];
}

export interface QuestionBank {
  authorityBuilding: string[];
  vulnerabilityDeepDive: string[];
  contrarianDebate: string[];
  storytellingTriggers: string[];
  viralShortClip: string[];
}

export interface GuestReport {
  profile: ExecutiveProfile;
  topicMode: 'Topic Aligned' | 'General Discovery';
  // If Topic Provided
  topicAlignment?: {
    mainInsights: string[];
    expansions: ExpansionAngle[];
  };
  // If No Topic Provided
  proposedThemes?: Theme[];
  narrativeAnalysis: NarrativeAnalysis;
  strategicInsights: StrategicInsights;
  questionBank: QuestionBank;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}