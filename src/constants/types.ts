export type Email = {
    type: string;
    email: string;
}

export type PhoneNumber = {
    type: string;
    number: string;
}

export type Contact = {
    firstName: string;
    middleName?: string;
    lastName: string;
    notes?: string;
    emails?: Email[];
    phoneNumber: string;
}