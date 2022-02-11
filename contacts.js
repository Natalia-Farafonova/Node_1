const fs = require('fs/promises')
const path = require('path')
// const { randomUUID } = require('crypto')
const { v4 } = require("uuid");
const ct = require('./db/contacts.json') 

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, './db/contacts.json'),
    'utf8',
  ) 
  const result = JSON.parse(content)
  return result
}

async function listContacts() {
  return await readContent()
}

async function getContactById(contactId) {
  const contacts = await readContent()
  const [contact] = contacts.filter((c) => c.id === contactId)
  return contact ? contact : null
}

async function removeContact(contactId) {
     try {
    const contacts = await readContent();
    const idx = contacts.findIndex((item) => item.id.toString() === contactId);
    if (idx === -1) {
      return null;
    }
    // const newContacts = contacts.filter(item => item.id !== id);
    contacts.splice(idx, 1);
    
    console.table(contacts);
    return 'Success remove'
  } catch (error) {
    console.log(error);
  }
  

}

async function addContact(name, email, phone) {
  const contacts = await readContent()
  const newContact = { name, email, phone, id: v4() }
  contacts.push(newContact)
  await fs.writeFile(
    path.join(__dirname, 'contact.json'),
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}

module.exports = { listContacts, getContactById, removeContact, addContact }