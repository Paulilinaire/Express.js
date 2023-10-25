import { readFile, writeFileSync } from "fs";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";

export class ProductDao {
    constructor() {
        this.file = resolve("./data/productsDb.json");
        this.products = []
    }

    readFile() {
        const file = this.readFileSync(this.file, {encoding: "utf-8"});
        this.products = JSON.parse(file);
    }

    writeFile() {
        writeFileSync(this.file, JSON.stringify(this.products))
    }

    save(product) {
        // Génère un uuid
        product.id = uuidv4()
        // Ajout dans le tableau products
        this.products.push(product);
        // Mise à jour du fichier productsDb.json 
        this.writeFile();
        return product;
    }

    findById(id) {
        return this.products.find((p) => p.id === id)
    }
}