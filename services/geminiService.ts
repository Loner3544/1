import { GoogleGenAI, Type } from "@google/genai";
import { Prize, FortuneResult } from '../types';

// Initialize the Gemini API client
// Note: In a production environment, ensure your API key is securely managed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTeaFortune = async (prize: Prize): Promise<FortuneResult> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      你是一位居住在云南深山的智慧老茶师。
      一位客人刚刚获得了一杯饮品，名为"${prize.name}"。
      描述为："${prize.description}"。
      风味标签为："${prize.notes}"。

      请为他们写一段新中式风格的“茶语签文”。
      签文应神秘而充满鼓励，将饮品的特质与人生建议联系起来。
      字数控制在30字以内。
      同时，指定一个“幸运元素”（例如：山、水、雾、木、火、金、风）。

      请以 JSON 对象格式返回。
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fortune: {
              type: Type.STRING,
              description: "诗意的签文内容。"
            },
            luckyElement: {
              type: Type.STRING,
              description: "与饮品关联的幸运元素。"
            }
          },
          required: ["fortune", "luckyElement"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text) as FortuneResult;

  } catch (error) {
    console.error("Error generating fortune:", error);
    // Fallback if API fails or key is missing
    return {
      fortune: "茶汤初沸，沉浮之间见真意，静心处自有坦途。",
      luckyElement: "静"
    };
  }
};