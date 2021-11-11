const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.log(contacts);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find(({ id }) => id === contactId);
    console.log(contactById);
    return contactById;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const newListOfContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const content = JSON.stringify(newListOfContacts);
    await fs.writeFile(contactsPath, content);
    console.log(newListOfContacts);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  if (name && email && phone) {
    try {
      const data = await fs.readFile(contactsPath, "utf8");
      const contacts = JSON.parse(data);
      const newContact = {
        id: shortid.generate(),
        name: name,
        email: email,
        phone: phone,
      };
      const newListOfContacts = [...contacts, newContact];
      const content = JSON.stringify(newListOfContacts);
      console.log(newListOfContacts);
      await fs.writeFile(contactsPath, content);
    } catch (error) {
      console.log(error);
    }
  }
  console.log("All required fields are empty!");
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
