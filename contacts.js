const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  if (!contacts || contacts.length === 0) {
    console.log("Contacts list is empty");
    return;
  }
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  if (!contactById) {
    console.log("There is no such contact");
    return;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newListOfContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  const content = JSON.stringify(newListOfContacts);
  fs.writeFile(contactsPath, content);
  return newListOfContacts;
}

async function addContact(name, email, phone) {
  if (name && email && phone) {
    const contacts = await listContacts();
    const newContact = {
      id: shortid.generate(),
      name: name,
      email: email,
      phone: phone,
    };
    const newListOfContacts = [...contacts, newContact];
    const content = JSON.stringify(newListOfContacts);
    console.log(newListOfContacts);
    fs.writeFile(contactsPath, content);
    return newListOfContacts;
  }
  console.log("All required fields are empty!");
  return;
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
