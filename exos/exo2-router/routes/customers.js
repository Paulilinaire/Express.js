import express from 'express';
import { Customer } from '../models/Customer.js';
import { CustomerDao } from '../dao/customerDao.js';

const customers = express.Router();

// Classe d'accès aux données
export const customerDao = new CustomerDao();
customerDao.readFile

customers.use(express.json());

// Renvoie tous les clients
customers.get('/', (req, res) => {
    res.json(customerDao.getAll());
});

// Renvoie un client spécifique
customers.get('/:id', (req, res) => {
    let customer = customerDao.findById(req.params.id);
    // en cas d'id client inconnu, renvoie erreur 404
    if(customer == undefined) {
        res.status(404).json({code: 404, message:"Oops ! Aucun client n'a été trouvé avec cet Id."})
    }
    res.json(customer)
});

//Créé un client
customers.post('/', (req, res) => {
    const {lastname, firstname, phonenumber} = req.body;
    let customer = new Customer(null, lastname, firstname, phonenumber);
    res.json(customerDao.save(customer));
});


export default customers;