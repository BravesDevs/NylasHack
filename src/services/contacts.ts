import { generate } from './generation';
import Nylas from 'nylas';
import { config } from '../constants/config';
import { Contact } from '../constants/types';

require('dotenv').config();

const contactPrompt = process.env.CONTACT_MODEL_PROMPT || "";

export const contactCreate = async (grantId: string, token: String, phrase: String) => {
    try {
        console.log(grantId)
        const nylas = new Nylas({
            apiKey: config.apiKey || "",
            apiUri: process.env.NYLAS_CLIENT_SECRET
        });
        const contactResult = await generate(contactPrompt, phrase) as Contact;

        return await nylas.contacts.create({
            identifier: grantId,
            requestBody: {
                givenName: contactResult.firstName,
                surname: contactResult.lastName,
                phoneNumbers: [{ type: 'work', number: contactResult.phoneNumber }],
            }
        });
    } catch (error) {
        return error;
    }
}

export const contactDelete = async (grantId: string, token: String, phrase: String) => {
    try {
        //     Find the contact with the given firstName or lastName or contactNumber
        const nylas = new Nylas({
            apiKey: config.apiKey || "",
            apiUri: process.env.NYLAS_CLIENT_SECRET
        });
        const contactResult = await generate(contactPrompt, phrase) as Contact;

        const contacts = await nylas.contacts.list({
            identifier: grantId,
            queryParams: {},
        })

        // Find the contact id to delete the contact
        for (let contact of contacts.data) {
            console.log(contact)
            console.log("---------------------------------------------")
        }



    } catch (error) {
        return error;
    }
};