const express = require("express");
const connection = require("./connection");
const app = express();
const router = express.Router();
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const LivroModel = require('../model/LivrosModal'); // import correto
const EditoraModal = require("../model/EditorasModal")

const Livro = LivroModel(connection, require('sequelize').DataTypes); // inicializa modelo
const Editora = EditoraModal(connection, require('sequelize').DataTypes);
Livro.sync(); // cria a tabela se ainda não existir

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());  // Permite requisições de qualquer origem

connection.authenticate().then(() => {
    console.log("database connection");
}).catch((error) => {
    console.log(error);
});

// ROTA PARA BUSCAR LIVROS
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
    } catch (error) {
        console.error("Erro Sequelize:", error);
        res.status(500).json({ error: 'Erro ao buscar livros', details: error.message });
    }
});

// ROTA PARA CRIAR LIVROS
// Rota para criar um novo livro
router.post('/livros', async (req, res) => {
  try {
      const { codigo, nome, ano, categoria, editora, isbn, autor } = req.body;
      // Verifica se todos os campos necessários foram fornecidos
      if (!codigo || !nome || !ano || !categoria || !editora || !isbn || !autor) {
          return res.status(400).json({ error: 'Campos faltando' });
      }
      // Cria um novo livro no banco de dados
      const livro = await Livro.create({
          codigo,
          nome,
          ano,
          categoria,
          editora,
          isbn,
          autor
      });
      // Retorna o livro criado como resposta
      res.status(201).json(livro);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

// Rota para atualizar um livro
router.put('/livros/:id', async (req, res) => {
  try {
      const { id } = req.params;  // ID do livro a ser atualizado
      const { nome, ano, categoria, editora, isbn, autor } = req.body;

      const livro = await Livro.findByPk(id);
      if (!livro) {
          return res.status(404).json({ error: 'Livro não encontrado' });
      }

      // Atualiza os dados do livro
      await livro.update({ nome, ano, categoria, editora, isbn, autor });

      res.status(200).json(livro);  // Retorna o livro atualizado

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar livro' });
  }
});

// Rota para excluir um livro
router.delete('/livros/:id', async (req, res) => {
  try {
      const { id } = req.params;  // ID do livro a ser excluído
      const livro = await Livro.findByPk(id);
      
      if (!livro) {
          return res.status(404).json({ error: 'Livro não encontrado' });
      }

      await livro.destroy();  // Exclui o livro

      res.status(200).json({ message: 'Livro excluído com sucesso' });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir livro' });
  }
});







//<---------------Comandos de Editora------------------>
router.get('/editoras', async (req, res) => {
  try {
      const editoras = await Editora.findAll();
      res.json(editoras);
  } catch (error) {
      console.error("Erro Sequelize:", error);
      res.status(500).json({ error: 'Erro ao buscar Editora', details: error.message });
  }
});

app.use('/', router);

app.listen(5000, () => {
    console.log("Servidor rodando na porta 5000");
});


// Rota para criar um novo livro
router.post('/editoras', async (req, res) => {
    try {
        const { nome, gerente, email, endereco, celular, telefone } = req.body;
        // Verifica se todos os campos necessários foram fornecidos
        if (!nome || !gerente || !email || !endereco || !celular || !telefone) {
            return res.status(400).json({ error: 'Campos faltando' });
        }
        // Cria um novo livro no banco de dados
        const editora = await Editora.create({
            nome, gerente, email, endereco, celular, telefone 
        });
        // Retorna o livro criado como resposta
        res.status(201).json(editora);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar Editora' });
    }
  });
  
  // Rota para atualizar um Editora
  router.put('/editoras/:id', async (req, res) => {
    try {
        const { id } = req.params;  // ID do editora a ser atualizado
        const { nome, gerente, email, endereco, celular, telefone } = req.body;
  
        const editora = await Editora.findByPk(id);
        if (!editora) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
  
        // Atualiza os dados do livro
        await editora.update({nome, gerente, email, endereco, celular, telefone });
  
        res.status(200).json(editora);  // Retorna o livro atualizado
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar editora' });
    }
  });
  
  // Rota para excluir um livro
  router.delete('/editoras/:id', async (req, res) => {
    try {
        const { id } = req.params;  // ID do livro a ser excluído
        const editora = await Editora.findByPk(id);
        
        if (!editora) {
            return res.status(404).json({ error: 'Editora não encontrado' });
        }
  
        await editora.destroy();  // Exclui o livro
  
        res.status(200).json({ message: 'Editora excluído com sucesso' });
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir Editora' });
    }
  });