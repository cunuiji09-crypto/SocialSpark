
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, Style, ContentIdea, CalendarDay } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateIdeas = async (niche: string, platform: Platform, style: Style): Promise<ContentIdea[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere 3 ideias criativas de conteúdo para a plataforma ${platform} no nicho de "${niche}" com o estilo "${style}".`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            hook: { type: Type.STRING },
            description: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "hook", "description", "hashtags"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
};

export const generateWeeklyCalendar = async (niche: string): Promise<CalendarDay[]> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Crie um calendário de conteúdo de 7 dias para o nicho "${niche}". Alternando entre Instagram, TikTok, YouTube e Blog.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            day: { type: Type.STRING },
            platform: { type: Type.STRING },
            idea: { type: Type.STRING },
          },
          required: ["day", "platform", "idea"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
};

export const generateEngagementTools = async (topic: string): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere sugestões de engajamento para o tópico "${topic}": 5 títulos virais, 15 hashtags estratégicas e uma descrição otimizada (copy).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          viralTitles: { type: Type.ARRAY, items: { type: Type.STRING } },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          optimizedDescription: { type: Type.STRING },
          engagementTips: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["viralTitles", "hashtags", "optimizedDescription", "engagementTips"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const generateNanoBananaTemplate = async (prompt: string, platform: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `Um template visual moderno e vibrante para ${platform} focado em: ${prompt}. Estilo minimalista, cores neon e espaço para texto.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: platform === 'Instagram' ? "4:5" : platform === 'Blog' ? "16:9" : "9:16",
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return "";
};

export const fetchCuriosities = async (): Promise<any> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Gere 3 fatos interessantes sobre marketing digital, comportamento de audiência ou branding.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            fact: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["title", "fact", "category"],
        },
      },
    },
  });
  return JSON.parse(response.text || "[]");
};
