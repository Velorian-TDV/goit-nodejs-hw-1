import { program } from "commander";

import * as contactService from './contacts.js';

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const listContacts = await contactService.listContacts()
            return console.table(listContacts);

        case 'get':
            const contact = await contactService.getContactById(id)
            return console.table(contact)

        case 'add':
            const newContact = await contactService.addContact(name, email, phone);
            return console.table(newContact);

        case 'remove':
            const deletedContact = await contactService.removeContact(id);
            return console.table(deletedContact);

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

program
    .option('-a, --action <type>')
    .option('-i, --id <type>')
    .option('-n, --name <type>')
    .option('-e, --email <type>')
    .option('-p, --phone <type>')

program.parse();
const options = program.opts();
invokeAction(options);