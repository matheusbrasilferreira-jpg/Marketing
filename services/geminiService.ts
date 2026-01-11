
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly as required by guidelines.
export const getPersonalizedAdvice = async (skill: string, hours: number, income: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const prompt = `Como um mentor especialista em negócios digitais, crie um mini-plano personalizado de 3 passos para ganhar dinheiro pelo celular para alguém com as seguintes características:
  - Habilidade principal: ${skill}
  - Horas disponíveis por dia: ${hours}h
  - Meta financeira: R$ ${income} por mês.
  
  Responda em português, de forma motivadora e prática, focando APENAS no uso do celular.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, ocorreu um erro ao gerar seu plano personalizado. Tente novamente mais tarde.";
  }
};
