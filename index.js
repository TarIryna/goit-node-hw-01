const argv = require("yargs").argv;
const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const listOfContacts = await contactsOperations.listContacts();
        console.log(listOfContacts);
        break;

      case "get":
        console.log(await contactsOperations.getContactById(id));
        break;

      case "add":
        console.log(await contactsOperations.addContact(name, email, phone));
        break;

      case "remove":
        console.log(await contactsOperations.removeContact(id));
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
}

invokeAction(argv);
