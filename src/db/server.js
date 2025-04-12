const express = require('express');
const cors = require('cors');
const db = require("./connection");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // serve o index.html e afins

//POST das Tabelas
app.post('/inserir/:tabela', (req, res) => {
  const {codigo,nome,ano,categoria,editora,isbn,autor} = req.body;


  const sql = `INSERT INTO livros (codigo,nome,ano,categoria,editora,isbn,autor) VALUES (?,?,?,?,?,?,?)`;

  db.query(sql, [codigo,nome,ano,categoria,editora,isbn,autor], (error, results) => {
    if (error) {
      console.error('Erro ao inserir dados:', error);
      return res.status(500).json({ error: 'Erro ao inserir dados no banco de dados.' });
    }
    res.json({ message: 'Dados inseridos com sucesso!', id: results.insertId });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
