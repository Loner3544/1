import { GoogleGenAI, Type } from "@google/genai";
import { Prize, FortuneResult } from '../types';

// Fallback library for when API Key is missing or request fails
const FALLBACK_FORTUNES: FortuneResult[] = [
  { fortune: "茶汤初沸，沉浮之间见真意，静心处自有坦途。", luckyElement: "静" },
  { fortune: "半盏清茶，观叶舒展，人生亦如是，退一步海阔天空。", luckyElement: "水" },
  { fortune: "香气入魂，此刻便是永恒。莫问前程凶吉，且饮这杯温热。", luckyElement: "火" },
  { fortune: "苦尽甘来，回味悠长。当下的困顿，皆是未来的伏笔。", luckyElement: "土" },
  { fortune: "云雾散去，山峦自现。心中无挂碍，方得大自在。", luckyElement: "山" },
  { fortune: "如林间风，去留无意。顺势而为，好运自会敲门。", luckyElement: "风" },
  { fortune: "金石为开，诚意正心。坚持你所热爱的，时间会给出答案。", luckyElement: "金" },
  { fortune: "一期一会，难得一面。珍惜眼前人，便是最大的福报。", luckyElement: "缘" }
];

const getRandomFallback = (): FortuneResult => {
  const index = Math.floor(Math.random() * FALLBACK_FORTUNES.length);
  return FALLBACK_FORTUNES[index];
};

export const generateTeaFortune = async (prize: Prize): Promise<FortuneResult> => {
  const apiKey = process.env.API_KEY;

  // 1. Check if API Key is missing or empty
  if (!apiKey || apiKey.trim() === '') {
    console.warn("Gemini API Key is missing. Using offline fallback mode.");
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getRandomFallback();
  }

  try {
    // Only initialize client if key exists
    const ai = new GoogleGenAI({ apiKey: apiKey });
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
    console.error("Error generating fortune, switching to fallback:", error);
    // 2. Fallback if API fails (e.g., quota exceeded or invalid key)
    return getRandomFallback();
  }
};