const {
    GoogleGenerativeAI,
} = require("@google/generative-ai");

import { extractJson } from "../constants/functions";

require('dotenv').config();
import { Contact } from "../constants/types";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL });

export const generate = async (prompt: String, phrase: String): Promise<Contact | undefined> => {
    try {
        const GENERATION_CONFIG = process.env.GENERATION_CONFIG;
        const SAFETY_SETTINGS = process.env.SAFETY_SETTINGS;
        const _prompt = prompt + "" + phrase;

        // Generate content
        const result = await model.generateContent(_prompt, GENERATION_CONFIG, SAFETY_SETTINGS);
        let text = result.response.text();
        return extractJson(text);
    } catch (error) {
        console.log(error)
        return undefined;
    }
}