import { readFileSync, writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";

export class OrderDao {
    constructor() {
        this.file = resolve("./data/ordersDb.json");
        this.orders = []
    }

    readFile() {
        const file = this.readFileSync(this.file, {encoding: "utf-8"});
        this.orders = JSON.parse(file);
    }

    writeFile() {
        writeFileSync(this.file, JSON.stringify(this.orders))
    }

    getAll() {
        return this.orders;
    }

    save(order) {
        // Génération d'un uuid
        order.id = uuidv4()
        // Ajout dans le tableau cusomers
        this.orders.push(order);
        // Mise à jour du fichier ordersDb.json 
        this.writeFile();
        return order;
    }

    findById(id) {
        return this.todos.find((o) => o.id === id);
    }

}