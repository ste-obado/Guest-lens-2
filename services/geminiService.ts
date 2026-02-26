import { GoogleGenAI, Type, Schema, GenerateContentResponse } from "@google/genai";
import { GuestReport, GroundingChunk } from "../types";

// Define the response schema strictly to ensure robust JSON parsing
const reportSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    profile: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        inflectionPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
        coreExpertise: { type: Type.ARRAY, items: { type: Type.STRING } },
        publicNarrative: { type: Type.STRING },
        reputationPositioning: { type: Type.STRING },
      },
      required: ["summary", "inflectionPoints", "coreExpertise", "publicNarrative", "reputationPositioning"]
    },
    topicMode: {
      type: Type.STRING,
      enum: ["Topic Aligned", "General Discovery"]
    },
    topicAlignment: {
      type: Type.OBJECT,
      properties: {
        mainInsights: { type: Type.ARRAY, items: { type: Type.STRING } },
        expansions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              angle: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["angle", "description"]
          }
        }
      },
      description: "Only populated if an episode topic was provided."
    },
    proposedThemes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          themeName: { type: Type.STRING },
          reason: { type: Type.STRING },
          strategicValue: { type: Type.STRING },
          audienceAppeal: { type: Type.STRING },
          riskLevel: { type: Type.STRING, enum: ["Safe", "Bold", "Controversial", "High-Risk"] },
          questions: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["themeName", "reason", "strategicValue", "audienceAppeal", "riskLevel", "questions"]
      },
      description: "Only populated if NO episode topic was provided."
    },
    narrativeAnalysis: {
      type: Type.OBJECT,
      properties: {
        repeatedStories: { type: Type.ARRAY, items: { type: Type.STRING } },
        achievements: { type: Type.ARRAY, items: { type: Type.STRING } },
        emotionalAnchors: { type: Type.ARRAY, items: { type: Type.STRING } },
        avoidedAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
        languagePatterns: { type: Type.ARRAY, items: { type: Type.STRING } },
        industryStances: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["repeatedStories", "achievements", "emotionalAnchors", "avoidedAreas", "languagePatterns", "industryStances"]
    },
    strategicInsights: {
      type: Type.OBJECT,
      properties: {
        hiddenTensions: { type: Type.ARRAY, items: { type: Type.STRING } },
        contradictions: { type: Type.ARRAY, items: { type: Type.STRING } },
        pressureTestAngles: { type: Type.ARRAY, items: { type: Type.STRING } },
        assumptionsToChallenge: { type: Type.ARRAY, items: { type: Type.STRING } },
        industryMyths: { type: Type.ARRAY, items: { type: Type.STRING } },
        uncomfortableProbes: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["hiddenTensions", "contradictions", "pressureTestAngles", "assumptionsToChallenge", "industryMyths", "uncomfortableProbes"]
    },
    questionBank: {
      type: Type.OBJECT,
      properties: {
        authorityBuilding: { type: Type.ARRAY, items: { type: Type.STRING } },
        vulnerabilityDeepDive: { type: Type.ARRAY, items: { type: Type.STRING } },
        contrarianDebate: { type: Type.ARRAY, items: { type: Type.STRING } },
        storytellingTriggers: { type: Type.ARRAY, items: { type: Type.STRING } },
        viralShortClip: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["authorityBuilding", "vulnerabilityDeepDive", "contrarianDebate", "storytellingTriggers", "viralShortClip"]
    }
  },
  required: ["profile", "topicMode", "narrativeAnalysis", "strategicInsights", "questionBank"]
};

export const generateGuestReport = async (
  name: string,
  website: string,
  linkedin: string,
  context: string,
  topic: string
): Promise<{ data: GuestReport; sources: GroundingChunk[] }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set it in the environment.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Act as a senior investigative researcher, strategic interviewer, and cognitive thinking partner.
    
    Target: ${name}
    Website: ${website}
    LinkedIn: ${linkedin}
    Additional Context/Notes: ${context}
    
    ${topic ? `SPECIFIC EPISODE TOPIC: ${topic}` : "NO SPECIFIC TOPIC PROVIDED - ANALYZE BROAD POTENTIAL"}

    Your goal is to build a "Guest Intelligence Report".
    
    STEP 1 — TOPIC MODE DETECTION
    If the topic is provided above, align all insights around it.
    If NO topic is provided, propose 3 potential high-impact episode themes.

    STEP 2 — EXECUTIVE INTELLIGENCE PROFILE
    Analyze their career, narrative, and reputation.

    STEP 3 — NARRATIVE & PATTERN ANALYSIS
    Extract repeated stories, language patterns, and avoided areas.

    STEP 4 — STRATEGIC THINKING INSIGHTS
    Find hidden tensions, contradictions, and myths to dissect.

    STEP 5 — HIGH-IMPACT QUESTION GENERATOR
    Create elite, strategic questions.

    Use the available search tools to find real, up-to-date information about the guest if you do not have enough internal knowledge.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
        tools: [{ googleSearch: {} }], 
        systemInstruction: "You are an elite podcast producer and researcher. You value depth, strategy, and non-generic insights. You are preparing a host for a high-stakes interview."
      }
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from Gemini.");
    }

    const reportData: GuestReport = JSON.parse(jsonText);
    
    // Extract grounding sources if available
    const sources: GroundingChunk[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { data: reportData, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};