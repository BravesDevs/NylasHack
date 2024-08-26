export const extractJson = (text: String) => {
    text = text.replace('json', '').trim();
    const jsonStart = text.indexOf('```') + 3;
    const jsonEnd = text.lastIndexOf('```');
    const jsonString = text.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
};