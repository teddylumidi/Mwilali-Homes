import { GoogleGenAI, Type } from "@google/genai";
import { Property, ChatMessage } from "../types";

// Helper to get safe client
const getClient = () => {
    let apiKey = undefined;
    try {
        // Safety check: process might not be defined in browser environments
        // if not replaced by build tool.
        if (typeof process !== 'undefined' && process.env) {
            apiKey = process.env.API_KEY;
        }
    } catch (e) {
        console.warn("Unable to access process.env");
    }

    if (!apiKey) {
        console.error("API_KEY is missing from environment variables");
        throw new Error("API Key is missing. Please configure it.");
    }
    return new GoogleGenAI({ apiKey });
};

/**
 * Uses Gemini to interpret a natural language search query and filter the property list.
 * Returns a list of matching Property IDs.
 */
export const searchPropertiesWithAI = async (
  query: string,
  properties: Property[]
): Promise<string[]> => {
  try {
    const ai = getClient();
    
    // Create a simplified version of properties to save tokens
    const propertySummaries = properties.map(p => ({
      id: p.id,
      description: `${p.title} (${p.category}) in ${p.city}, ${p.state}. Price: ${p.priceLabel || p.price}. Beds: ${p.beds}. Features: ${p.features.join(", ")}. Desc: ${p.description}`
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the intelligent search engine for Mwalali Homes in Nairobi, Kenya. 
      The user is searching for: "${query}".
      
      Here is the database of available properties:
      ${JSON.stringify(propertySummaries)}
      
      Return a JSON object with a single property "matchedIds" which is an array of strings containing the IDs of the properties that best match the user's intent.
      If the user is vague, return the most prominent 'Sale' listings (Brookside Oak, Oak Breeze).
      Sort by relevance.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    return json.matchedIds || [];
  } catch (error) {
    console.error("Error searching properties with AI:", error);
    // Fallback: return all if AI fails
    return properties.map(p => p.id);
  }
};

/**
 * Chat with the AI Real Estate Agent.
 */
export const chatWithAgent = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const ai = getClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are the Mwalali Homes Assistant. You represent a professional real estate firm in Kilimani, Nairobi. You have two main luxury projects for sale: 'Brookside Oak' in Westlands and 'Oak Breeze' in Kilimani. Be helpful, professional, and encourage users to book a viewing or contact the sales team at +254721 615 737. Currency is KES. Speak highly of the investment potential."
      }
    });

    const response = await chat.sendMessage({
      message: newMessage
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "I'm having trouble connecting to the server right now. Please try again later.";
  }
};