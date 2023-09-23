import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contatsPath = path.resolve('db', 'contacts.json')
const updateContacts = contacts => fs.writeFile(contatsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const contacts = await fs.readFile(contatsPath);
    return JSON.parse(contacts);;
}

export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId)
    return result || null;
}

export const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result
}