import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";

export class ContactDao {
  constructor() {
    this.file = resolve("./data/db.json");
    this.contacts = [];
  }

  readFile() {
    const file = readFileSync(this.file, { encoding: "utf-8" });
    this.contacts = JSON.parse(file);
  }

  writeFile() {
    writeFileSync(this.file, JSON.stringify(this.contacts));
  }

  getAll() {
    return this.contacts;
  }

  save(contact) {
    contact.id = uuidv4();
    this.contacts.push(contact);
    this.writeFile();
    return contact;
  }

  findById(id) {
    return this.contacts.find((t) => t.id === id);
  }

  deleteContact(id) {
    this.contacts = this.contacts.filter((t) => t.id !== id);
    this.writeFile();
  }

  updateContact(contactUpdate) {
    const contact = this.findById(contactUpdate.id);
    if (contact == undefined) {
      return false;
    }
    contact.firsName = contactUpdate.firstName;
    contact.lastName= contactUpdate.lastName
    contact.phone = contactUpdate.phone;
    contact.email = contactUpdate.email;

    this.writeFile();
    return true;
  }

}
