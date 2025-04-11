const express =  require('express');
const allItems = require('./allItems');

const app = express();

app.use(express.json());

const PORT = 3003;

app.listen(3003, () => {console.log(`Funcionando na porta ${PORT}`)});

app.get("/", async(req,res) => {
    const query = await allItems();
    return res.status(201).json(query)
})