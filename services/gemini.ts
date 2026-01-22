
import { GoogleGenAI, Type } from "@google/genai";
import { Platform, Style, ContentIdea, CalendarDay } from "../types.ts";

// Função auxiliar para obter a instância do AI com a chave mais recente
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateIdeas = async (niche: string, platform: Platform, style: Style): Promise<ContentIdea[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere 3 ideias criativas de conteúdo para a plataforma ${platform} no nicho de "${niche}" com o estilo "${style}". Seja inovador e focado em viralização.`,
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
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
       throw new Error("KEY_NOT_FOUND");
    }
    throw error;
  }
};

export const generateWeeklyCalendar = async (niche: string): Promise<CalendarDay[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Crie um calendário de conteúdo de 7 dias para o nicho "${niche}". Alternando estrategicamente entre Instagram, TikTok, YouTube e Blog para maximizar o alcance.`,
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
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere estratégias de engajamento de alto nível para o tópico "${topic}": 5 títulos clickbait éticos, 15 hashtags de nicho e uma copy persuasiva otimizada para conversão.`,
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
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `Template visual premium para ${platform}: ${prompt}. Design limpo, estético, com hierarquia visual clara e iluminação dramática.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: platform === 'Instagram' ? "1:1" : platform === 'Blog' ? "16:9" : "9:16",
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Não foi possível gerar a imagem.");
};

export const fetchCuriosities = async (): Promise<any> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: "Gere 3 insights psicológicos ou tendências atuais sobre marketing digital e criação de conteúdo.",
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
