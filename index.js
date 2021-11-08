const argv = require("yargs").argv;
const contactsOperations = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsOperations.listContacts();
      break;

    case "get":
      contactsOperations.getContactById(id);
      break;

    case "add":
      contactsOperations.addContact(name, email, phone);
      break;

    case "remove":
      contactsOperations.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
