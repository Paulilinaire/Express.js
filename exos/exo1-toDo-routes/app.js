import express, { query } from 'express';

const app = express()
const todos = [{}]

app.use(express.json()); //middleware

// Créer une todo
app.post("/todos", (req, res) => {
    res.json(req.body)
    todos.push(req.body)
});

app.get("/todos", (req, res) =>  {
    res.json(todos)
});

// Mettre à jour une todo
app.put("/todos/:todoId", (req, res) => {
    res.json(req.body)
});

// supprimer une todo
app.delete("/todos/:todoId", (req, res) => {
    res.json()
    todos.pop()
});

app.listen("3030", () => {
    console.log("http://127.0.0.1:3030");
});

// Récupérer une todo