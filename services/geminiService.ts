import { GoogleGenAI, Type } from "@google/genai";
import { Lead } from '../types';

// FIX: Initialize Gemini API client according to guidelines.
// The API key is sourced exclusively from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface EnrichedData {
    companySummary: string;
    keyPersonnel: { name: string; role: string }[];
    recentNews: string;
}

// FIX: Define a response schema for structured JSON output.
// This provides more reliable parsing than string splitting.
const enrichmentSchema = {
    type: Type.OBJECT,
    properties: {
        companySummary: {
            type: Type.STRING,
            description: "A brief summary of the company."
        },
        keyPersonnel: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING }
                },
                required: ['name', 'role']
            },
            description: "A list of 2-3 key personnel with their roles."
        },
        recentNews: {
            type: Type.STRING,
            description: "One recent news headline about the company."
        }
    },
    required: ['companySummary', 'keyPersonnel', 'recentNews']
};


export const enrichLeadWithAI = async (lead: Lead): Promise<EnrichedData> => {
    console.log(`Enriching lead for: ${lead.companyName}`);

    // FIX: Removed mock API call logic to adhere to guidelines.
    // The application should rely on the environment-provided API key.
    
    // Real API call
    try {
        const prompt = `Provide a brief company summary, a list of 2-3 key personnel with their roles, and one recent news headline for the company: ${lead.companyName}, which is in the ${lead.industry} industry.`;

        // FIX: Use responseSchema for structured JSON output from the Gemini API.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: enrichmentSchema,
            },
        });
        
        // FIX: Parse the JSON response from the API instead of splitting the text.
        const text = response.text.trim();
        const jsonData = JSON.parse(text);
        return jsonData as EnrichedData;
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to enrich lead data with AI.");
    }
};
