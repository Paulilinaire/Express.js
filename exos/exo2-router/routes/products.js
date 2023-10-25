import express from 'express';
import { Product } from '../models/Product.js'
import { ProductDao } from '../dao/ProductDao.js'

const products = express.Router();

const productDao = new ProductDao();
productDao.readFile

products.use(express.json());

// Renvoie un produit spécifique par son Id
products.get('/:productId', (req, res) => {
    let product = productDao.findById(req.params.productId);
    if (product == undefined) {
        res.status(404).json({code: 404, message:"Oops ! Aucune commande n'a été trouvé avec cet Id."})
    }res.json(product)
});

//Créé un produit
products.post('/', (req, res) => {
    const {title, price, stock} = req.body;
    let product = new Product (null, title, price, stock);
    res.json(productDao.save(product));
});

export default products;
