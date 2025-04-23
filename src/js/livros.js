// Abrir e fechar modais
const openModal = () => document.getElementById('modal').classList.add('active');
const openModal2 = () => document.getElementById('modal2').classList.add('active');

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
};

const closeModal2 = () => {
    document.getElementById('modal2').classList.remove('active');
};

// Variáveis globais
let livros = [];
let livroParaExcluir = null;

// Buscar livros do backend
const readLivros = async () => {
    try {
        const response = await fetch('http://localhost:5000/livros');
        const data = await response.json();
        livros = data;
        updateTable();
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }
};

// Criar livro
const createLivro = async (livro) => {
    try {
        const response = await fetch('http://localhost:5000/livros', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });
        const data = await response.json();
        if (response.ok) {
            alert('Livro criado com sucesso');
        } else {
            alert('Erro ao criar livro:', data);
        }
        readLivros();
    } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
    }
};

// Atualizar livro
const updateLivro = async (index, livro) => {
    try {
        const response = await fetch(`http://localhost:5000/livros/${livro.codigo}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });

        if (!response.ok) throw new Error('Erro ao atualizar livro');

        alert('Livro atualizado com sucesso');
        readLivros();
        closeModal();
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
    }
};

// Excluir livro
const deleteLivro = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/livros/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (!response.ok) throw new Error('Erro ao excluir livro');

        alert(data.message);
        readLivros();
        closeModal2();
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
    }
};

// Atualizar tabela
const updateTable = () => {
    const tableBody = document.querySelector('#tableLivro tbody');
    tableBody.innerHTML = '';
    livros.forEach((livro, index) => createRow(livro, index));
};

// Criar linha na tabela
const createRow = (livro, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${livro.codigo}</td>
        <td>${livro.nome}</td>
        <td>${livro.categoria}</td>
        <td>${livro.editora}</td>
        <td>${livro.autor}</td>
        <td>${livro.ano}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableLivro tbody').appendChild(newRow);
};

// Editar livro
const editLivro = (index) => {
    const livro = livros[index];
    if (!livro) return;

    document.getElementById('codigo').value = livro.codigo;
    document.getElementById('nome').value = livro.nome;
    document.getElementById('ano').value = livro.ano;
    document.getElementById('categoria').value = livro.categoria;
    document.getElementById('editora').value = livro.editora;
    document.getElementById('isbn').value = livro.isbn;
    document.getElementById('autor').value = livro.autor;
    document.getElementById('nome').dataset.index = index;

    openModal();
};

// Modal de exclusão
const openDeleteModal = (index) => {
    const livro = livros[index];
    if (!livro) return;

    document.getElementById('avisoDelete').textContent = `Deseja realmente excluir o livro ${livro.nome}?`;
    livroParaExcluir = livro.codigo;
    openModal2();
};

document.getElementById('apagar').addEventListener('click', () => {
    if (livroParaExcluir !== null) {
        deleteLivro(livroParaExcluir);
        livroParaExcluir = null;
    }
});

// Validação
const isValidFields = () => document.getElementById('form').reportValidity();

// Limpar campos
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
    document.getElementById('nome').dataset.index = 'new';
};

// Salvar livro
const saveLivro = () => {
    if (isValidFields()) {
        const livro = {
            codigo: document.getElementById('codigo').value,
            nome: document.getElementById('nome').value,
            ano: document.getElementById('ano').value,
            categoria: document.getElementById('categoria').value,
            editora: document.getElementById('editora').value,
            isbn: document.getElementById('isbn').value,
            autor: document.getElementById('autor').value
        };

        const index = document.getElementById('nome').dataset.index;
        if (index === 'new') {
            createLivro(livro);
        } else {
            updateLivro(index, livro);
        }
    }
};

// Evento de clique nos botões da tabela
const editDelete = (event) => {
    if (event.target.type === 'button') {
        const [action, index] = event.target.id.split('-');

        if (action === 'edit') {
            editLivro(index);
        } else if (action === 'delete') {
            openDeleteModal(index);
        }
    }
};

// Eventos
updateTable();
readLivros();

document.getElementById('cadastrarLivro').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalClose2').addEventListener('click', closeModal2);
document.getElementById('salvar').addEventListener('click', saveLivro);
document.querySelector('#tableLivro>tbody').addEventListener('click', editDelete);
document.getElementById('cancelar').addEventListener('click', closeModal);
document.getElementById('cancelar2').addEventListener('click', closeModal2);
