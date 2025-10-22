
import { GoogleGenAI, Type } from "@google/genai";
import { Lead } from '../types';

// FIX: Initialize GoogleGenAI with API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// FIX: Define a schema for the expected JSON output from the model.
const leadEnrichmentSchema = {
    type: Type.OBJECT,
    properties: {
        companySummary: {
            type: Type.STRING,
            description: 'A brief, one-sentence summary of what the company does.',
        },
        keyPersonnel: {
            type: Type.ARRAY,
            description: 'A list of 1-2 key people at the company, with their roles.',
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                },
                required: ['name', 'role'],
            },
        },
        recentNews: {
            type: Type.STRING,
            description: 'A single, recent, and relevant news headline about the company.',
        },
    },
    required: ['companySummary', 'keyPersonnel', 'recentNews'],
};


export interface EnrichedData {
    companySummary: string;
    keyPersonnel: { name: string; role: string }[];
    recentNews: string;
}

/**
 * Enriches a lead with additional information using the Gemini API.
 * @param lead - The lead to enrich.
 * @returns Enriched data or null if an error occurs.
 */
export const enrichLeadWithGemini = async (lead: Lead): Promise<EnrichedData | null> => {
    try {
        // FIX: Use gemini-2.5-flash for basic text tasks.
        const model = 'gemini-2.5-flash';
        const prompt = `Provide enrichment data for the following company: ${lead.companyName}. The company is in the ${lead.industry} industry and their website is ${lead.website}.`;

        // FIX: Call generateContent with the correct parameters and JSON response configuration.
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: leadEnrichmentSchema
            }
        });

        // FIX: Extract the text response correctly and parse it.
        const text = response.text;
        
        if (text) {
            // The response is a string, which needs to be parsed into a JSON object.
            const enrichedData: EnrichedData = JSON.parse(text);
            return enrichedData;
        }

        return null;
    } catch (error) {
        console.error("Error enriching lead with Gemini:", error);
        return null;
    }
};
