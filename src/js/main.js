const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");
      sidebarToggle2 = body.querySelector(".sidebar-toggle2");

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});

sidebarToggle2.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
});


// Modal perfil

function menuToggle(){
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
}

const divUserButtonAndDropdown = document.querySelector('.actionimg');
const dropdown = document.querySelector('.menu');

document.addEventListener('click', function (event) {
    if (!divUserButtonAndDropdown.contains(event.target)) {
        dropdown.classList.remove('active');
    }
})

document.addEventListener('DOMContentLoaded', () => {
    atualizarContadoresDashboard();
  });
  
  async function atualizarContadoresDashboard() {
    const rotas = [
      { id: 'number-livros', url: 'http://localhost:5000/livros' },
      { id: 'number-alunos', url: 'http://localhost:5000/alunos' },
      { id: 'number-editoras', url: 'http://localhost:5000/editoras' },
      { id: 'number-funcionario', url: 'http://localhost:5000/funcionarios' },
      { id: 'number-emprestimo', url: 'http://localhost:5000/emprestimos' }
    ];
  
    for (const item of rotas) {
      try {
        const response = await fetch(item.url);
        const data = await response.json();
        document.getElementById(item.id).textContent = data.length;
      } catch (error) {
        console.error(`Erro ao buscar ${item.url}:`, error);
        document.getElementById(item.id).textContent = 'Erro';
      }
    }
  }
  