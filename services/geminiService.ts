
import { GoogleGenAI } from "@google/genai";
import { Lead } from '../types';

// This is a mock implementation. In a real app, you would not need to mock the API key.
// It is assumed to be available in process.env.API_KEY.
const API_KEY = process.env.API_KEY || "mock_api_key_for_development";

// Do not use this in a real app, this is for demonstration purposes only without a backend.
const ai = API_KEY === "mock_api_key_for_development" ? null : new GoogleGenAI({ apiKey: API_KEY });

export interface EnrichedData {
    companySummary: string;
    keyPersonnel: { name: string; role: string }[];
    recentNews: string;
}

export const enrichLeadWithAI = async (lead: Lead): Promise<EnrichedData> => {
    console.log(`Enriching lead for: ${lead.companyName}`);

    // Mock API call if the API key is not set
    if (!ai) {
        console.log("Using mocked Gemini response.");
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    companySummary: `A leading company in the ${lead.industry} sector, ${lead.companyName} is known for its innovative solutions and has approximately ${lead.companySize} employees. They are headquartered in ${lead.location}.`,
                    keyPersonnel: [
                        { name: 'John Doe', role: 'CEO' },
                        { name: 'Jane Smith', role: 'CTO' },
                    ],
                    recentNews: `${lead.companyName} recently launched a new product line, expanding its market reach.`
                });
            }, 1500);
        });
    }

    // Real API call
    try {
        const prompt = `Provide a brief company summary, a list of 2-3 key personnel with their roles, and one recent news headline for the company: ${lead.companyName}, which is in the ${lead.industry} industry.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        // In a real app, you would parse the response text into a structured JSON object.
        // For simplicity, we'll just return the raw text here in a structured-like way.
        const text = response.text;
        return {
             companySummary: text.split('Key Personnel:')[0]?.replace('Company Summary:', '').trim() || 'Could not generate summary.',
             keyPersonnel: [{ name: 'Data from Gemini', role: 'See summary' }],
             recentNews: text.split('Recent News:')[1]?.trim() || 'No recent news found.',
        };
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to enrich lead data.");
    }
};
