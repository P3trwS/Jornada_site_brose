// Variáveis para armazenar os valores originais antes da edição
let originalValues = {};

// Função para alternar entre edição e visualização
// Função para alternar entre edição e visualização
function toggleEdit() {
    const labels = document.querySelectorAll('.infos label');
    const inputs = document.querySelectorAll('.infos input');
    const css = document.getElementById('css');
    const editButton = document.querySelector('.botoes .botao[title="Editar Funcionário"] img');
    const cancelButton = document.querySelector('.botoes .botao[title="Cancelar"]');
    
    const skillsParagraph = document.getElementById('skills');
    const skillsTextarea = document.getElementById('edit-skills');
    
    const isEditing = inputs[0].style.display === 'block';

    if (isEditing) {
        // Confirmação antes de salvar as alterações
        if (confirm("Deseja salvar as alterações?")) {
            // Se o usuário confirmar, salva os valores
            inputs.forEach((input, index) => {
                labels[index].textContent = input.value; // Atualiza os labels com o valor do input
                input.style.display = 'none'; // Esconde os inputs
                labels[index].style.display = ''; // Mostra os labels
            });

            // Salva o valor de skills e converte em parágrafos apenas para quebras reais de linha
            const skillsText = skillsTextarea.value.split(/\r?\n/); // Divide apenas nas quebras de linha reais
            skillsParagraph.innerHTML = ""; // Limpa o conteúdo anterior
            skillsText.forEach((line) => {
                if (line.trim() !== "") { // Evita adicionar parágrafos vazios
                    const newParagraph = document.createElement('p');
                    newParagraph.textContent = line;
                    skillsParagraph.appendChild(newParagraph);
                }
            });

            skillsTextarea.style.display = 'none';
            skillsParagraph.style.display = '';

            if (css.getAttribute('href') === "/Jornada_site_brose/Funcionarios Desc/Light Mode/light.css") {
                editButton.src = "/Jornada_site_brose/Funcionarios Desc/Light Mode/user-avatar preto.png"; // Volta para o ícone de editar
                cancelButton.style.display = 'none'; // Esconde o botão de cancelar
            } else {
                editButton.src = "/Jornada_site_brose/Funcionarios Desc/Dark Mode/user-avatar branco.png"; // Volta para o ícone de editar
                cancelButton.style.display = 'none'; // Esconde o botão de cancelar
            }
        }
    } else {
        // Armazena os valores originais antes de editar
        originalValues = {
            matricula: document.getElementById('edit-matricula').value,
            cargo: document.getElementById('edit-cargo').value,
            idade: document.getElementById('edit-idade').value,
            skills: skillsTextarea.value
        };

        // Habilita a edição
        inputs.forEach((input, index) => {
            input.style.display = 'block';
            labels[index].style.display = '';
        });

        skillsTextarea.style.display = 'block';
        skillsParagraph.style.display = '';

        editButton.src = "verificar.png"; // Muda o ícone para indicar salvar
        cancelButton.style.display = 'inline'; // Mostra o botão de cancelar
    }
}


// Função para cancelar a edição e reverter os valores
function cancelEdit() {
    const labels = document.querySelectorAll('.infos label');
    const inputs = document.querySelectorAll('.infos input');
    const css = document.getElementById('css');
    const editButton = document.querySelector('.botoes .botao[title="Editar Funcionário"] img');
    const cancelButton = document.querySelector('.botoes .botao[title="Cancelar"]');
    
    const skillsParagraph = document.getElementById('skills');
    const skillsTextarea = document.getElementById('edit-skills');

    // Confirmação antes de cancelar as alterações
    if (confirm("Tem certeza de que deseja cancelar as alterações?")) {
        // Se o usuário confirmar, reverte os valores para os originais
        inputs[0].value = originalValues.matricula;
        inputs[1].value = originalValues.cargo;
        inputs[2].value = originalValues.idade;
        skillsTextarea.value = originalValues.skills;

        // Volta ao modo de visualização
        inputs.forEach((input, index) => {
            input.style.display = 'none';
            labels[index].style.display = '';
        });

        skillsTextarea.style.display = 'none';
        skillsParagraph.style.display = '';

        if (css.getAttribute('href') === "/Jornada_site_brose/Funcionarios Desc/Light Mode/light.css") {
            // Atualiza o ícone e esconde o botão de cancelar
            editButton.src = "/Jornada_site_brose/Funcionarios Desc/Light Mode/user-avatar preto.png";
            cancelButton.style.display = 'none';
        } else {
            editButton.src = "/Jornada_site_brose/Funcionarios Desc/Dark Mode/user-avatar branco.png";
            cancelButton.style.display = 'none';
        }
    }
}


function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');
    const editButton = document.querySelector('.botoes .botao[title="Editar Funcionário"] img');
    const deletelButton = document.querySelector('.botoes .botao[title="Excluir Funcionário"] img');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/Jornada_site_brose/Funcionarios Desc/Dark Mode/dark.css') {
        css.setAttribute('href', '/Jornada_site_brose/Funcionarios Desc/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/IMAGENS IGUAIS/Light Mode/3 linhas preto.png'));
        editButton.src = '/Jornada_site_brose/Funcionarios Desc/Light Mode/user-avatar preto.png'
        deletelButton.src = '/Jornada_site_brose/Funcionarios Desc/Light Mode/delete.png'

    } else {
        css.setAttribute('href', '/Jornada_site_brose/Funcionarios Desc/Dark Mode/dark.css'); // Muda para o modo escuro
        editButton.src = '/Jornada_site_brose/Funcionarios Desc/Dark Mode/user-avatar branco.png'
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/IMAGENS IGUAIS/Dark Mode/3 linhas branco.png'));
        deletelButton.src = '/Jornada_site_brose/Funcionarios Desc/Dark Mode/delete-branco.png';
    }
}

function abrirOuFecharSideBar() {
    const sidebarBackground = document.querySelector('.sidebar-background');
    const sidebar = document.querySelector('.sidebar');

    // Alterna a visibilidade da barra lateral
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px'; // Esconde a sidebar
        setTimeout(() => {
            sidebarBackground.style.display = 'none'; // Esconde o background após a animação
        }, 300); // Espera a transição terminar
    } else {
        sidebarBackground.style.display = 'block'; // Mostra o background
        setTimeout(() => {
            sidebar.style.left = '0px'; // Mostra a sidebar com animação
        }, 10); // Pequeno atraso para garantir que o display seja alterado antes da animação
    }
}