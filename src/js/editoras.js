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
let editoras = [];
let editoraParaExcluir = null;

// Buscar editorado backend
const readEditora = async () => {
    try {
        const response = await fetch('http://localhost:5000/editoras');
        const data = await response.json();
        editoras = data;
        updateTable1();
    } catch (error) {
        console.error("Erro ao buscar editoras:", error);
    }
};

// Criar Editora
const createEditora = async (editora) => {
    try {
        const response = await fetch('http://localhost:5000/editoras', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editora)
        });
        const data = await response.json();
        if (response.ok) {
            alert('Editora criado com sucesso');
        } else {
            alert('Erro ao criar editora:', data);
        }
        readEditora();
    } catch (error) {
        console.error('Erro ao comunicar com o servidor:', error);
    }
};

// Atualizar Editora
const updateEditora = async (index, editora) => {
    try {
        const response = await fetch(`http://localhost:5000/editoras/${editora.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editora)
        });

        if (!response.ok) throw new Error('Erro ao atualizar editora');

        alert('editora atualizado com sucesso');
        readEditora();
        closeModal();
    } catch (error) {
        console.error('Erro ao atualizar editora:', error);
    }
};

// Excluir editora
const deleteEditora = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/editoras/${id}`, { method: 'DELETE' });
        const data = await response.json();
        if (!response.ok) throw new Error('Erro ao excluir editora');

        alert(data.message);
        readEditora();
        closeModal2();
    } catch (error) {
        console.error('Erro ao deletar editora:', error);
    }
};

// Atualizar tabela
const updateTable1 = () => {
    const tableBody = document.querySelector('#tableEditora tbody');
    tableBody.innerHTML = '';
    editoras.forEach((editora, index) => createRow(editora, index));
};

// Criar linha na tabela
const createRow = (editora, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${editora.nome}</td>
        <td>${editora.gerente}</td>
        <td>${editora.email}</td>
        <td>${editora.celular}</td>
        <td>${editora.telefone}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}">Excluir</button>
        </td>
    `;
    document.querySelector('#tableEditora tbody').appendChild(newRow);
};

// Editar Editora
const editEditora = (index) => {
    const editora = editoras[index];
    if (!editora) return;

    document.getElementById('nome').value = editora.nome;
    document.getElementById('gerente').value = editora.gerente;
    document.getElementById('email').value = editora.email;
    document.getElementById('endereco').value = editora.endereco;
    document.getElementById('celular').value = editora.celular;
    document.getElementById('telefone').value = editora.telefone;
    document.getElementById('nome').dataset.index = index;

    openModal();
};

// Modal de exclusão
const openDeleteModal = (index) => {
    const editora = editoras[index];
    if (!editora) return;

    document.getElementById('avisoDelete').textContent = `Deseja realmente excluir o Editora ${editora.nome}?`;
    editoraParaExcluir = editora.id;
    openModal2();
};

document.getElementById('apagar').addEventListener('click', () => {
    if (editoraParaExcluir !== null) {
        deleteEditora(editoraParaExcluir);
        editoraParaExcluir = null;
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

// Salvar Editora
const saveEditora = () => {
    if (isValidFields()) {
        const editora = {
            nome: document.getElementById('nome').value,
            gerente: document.getElementById('gerente').value,
            email: document.getElementById('email').value,
            endereco: document.getElementById('endereco').value,
            celular: document.getElementById('celular').value,
            telefone: document.getElementById('telefone').value
        };

        const index = document.getElementById('nome').dataset.index;
        if (index === 'new') {
            createEditora(editora);
        } else {
            updateEditora(index, editora);
        }
    }
};

// Evento de clique nos botões da tabela
const editDelete = (event) => {
    if (event.target.type === 'button') {
        const [action, index] = event.target.id.split('-');

        if (action === 'edit') {
            editEditora(index);
        } else if (action === 'delete') {
            openDeleteModal(index);
        }
    }
};

// Eventos
updateTable1();
readEditora();

document.getElementById('cadastrarEditora').addEventListener('click', openModal);
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalClose2').addEventListener('click', closeModal2);
document.getElementById('salvar').addEventListener('click', saveEditora);
document.querySelector('#tableEditora>tbody').addEventListener('click', editDelete);
document.getElementById('cancelar').addEventListener('click', closeModal);
document.getElementById('cancelar2').addEventListener('click', closeModal2);
