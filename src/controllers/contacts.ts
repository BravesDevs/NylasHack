import { contactCreate, contactDelete } from '../services/contacts';

export const addContactController = async (req: any, res: any) => {
    try {
        const { phrase } = req.body;
        console.log("In controller", req.grantId, req.token);
        if (!phrase) {
            res.status(400).json({ error: 'Phrase is required' });
            return;
        }

        let contact = await contactCreate(req.grantId, req.token, phrase);
        if (contact) {
            res.status(201).json({ message: 'Contact created successfully', });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteContactController = async (req: any, res: any) => {
    try {
        console.log("In delete controller", req.email, req.token);
        const { phrase } = req.body;
        if (!phrase) {
            res.status(400).json({ error: 'Phrase is required' });
            return;
        }

        await contactDelete(req.grantId, req.token, phrase);
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
}

