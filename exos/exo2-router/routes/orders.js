import express from 'express';
import { Order } from '../models/Order.js'
import { OrderDao } from '../dao/OrderDao.js';

const orders = express.Router();

// Classe d'accès aux données
const orderDao = new OrderDao();
orderDao.readFile

orders.use(express.json());

// Renvoie toutes les commandes
orders.get('/', (req, res) => {
    res.json(orderDao.getAll());
});

// Renvoie une commande spécifique
orders.get('/:orderId', (req, res) => {
    let order = orderDao.findById(req.params.orderId);
    // en cas d'id de commande incorrecte, renvoie erreur
    if(order == undefined) {
        res.status(404).json({code: 404, message:"Oops ! Aucune commande n'a été trouvé avec cet Id."})
    }
    res.json(order)
});

//Créé une commande
orders.post('/', (req, res) => {
    const {customer, productsList} = req.body;
    let order = new Order(null, customer, productsList);
    res.json(orderDao.save(order));
});


export default orders;