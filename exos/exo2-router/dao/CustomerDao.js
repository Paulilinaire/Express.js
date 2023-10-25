import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";

export class CustomerDao {
    constructor() {
        this.file = resolve("./data/customersDb.json");
        this.customers = []
    }

    readFile() {
        const file = this.readFileSync(this.file, {encoding: "utf-8"});
        this.customers = JSON.parse(file);
    }

    writeFile() {
        writeFileSync(this.file, JSON.stringify(this.customers))
    }

    getAll() {
        return this.customers;
    }

    save(customer) {
        // Génère un uuid
        customer.id = uuidv4()
        // Ajout dans le tableau customers
        this.customers.push(customer);
        // Mise à jour du fichier customersDb.json 
        this.writeFile();
        return customer;
    }

    findById(id) {
        return this.todos.find((c) => c.id === id);
    }

}