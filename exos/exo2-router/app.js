import express from "express";
import orders from "./routes/orders.js";
import customers from "./routes/customers.js";
import products from "./routes/products.js";

const port = 3002;

const app = express();

app.use(express.json());
app.use('/customers', customers);
app.use('/orders', orders)
app.use('/products', products)

app.get('/', (req, res) => {
    res.send('Accueil')
});


app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
});