import express from "express";
import Contact from "./models/Contact.js";
import { ContactDao } from "./dao/ContactDao.js";
import jwt from 'jsonwebtoken'

const app = express();

const contactDao = new ContactDao();

app.use(express.json());

//Middleware qui log la date à laquelle chaque requête a été effectuée
app.use((req, res, next) => {
  console.log('Date:', new Date())
  next()
});

app.get('/contacts', (req, res) => {
    res.json(contactDao.getAll());
});

app.get('/contacts/:contactId', (req, res) => {
    let contact = contactDao.findById(req.params.contactId);

    if(contact == undefined) {
        res.status(404).json({code: 404, message: "aucun contact trouvé avec cet id"});
    }

    res.json(contact);
});

// middleware authentification
app.use((req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Id utilisateur non valide';
      } else {
        next();
      }
    } catch {
      res.status(401).json({code: 401, message: "requête non valide"});
    }
  });

// Créer un contact
app.post('/contacts', (req, res) => {
    const {firstName, lastName, phone, email} = req.body;
    let contact = new Contact(null, firstName, lastName, phone, email);
    res.json(contactDao.save(contact));
});

// Mettre à jour le contact
app.put('/contacts/:contactId', (req, res) => {
    const {id, firstName, lastName, phone, email} = req.body;

    if(req.params.contactId != id) res.sendStatus(409);
    let contact = new Contact(id, firstName, lastName, phone, email);

    // Mise à jour du contact
    contactDao.updateContact(contact) ? res.sendStatus(200) : res.status(400).json({code: 400, message: "problème lors de la mise à jour du contact"})
});

// Supprimer le contact
app.delete('/contacts/:contactId', (req, res) => {
    contactDao.deleteContact(req.params.contactId);
    res.sendStatus(200);
});

app.listen(3003, () => {
    console.log('http://127.0.0.1:3003');
});
