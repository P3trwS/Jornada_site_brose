function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');
    const editar = document.querySelectorAll('img[alt="Editar"]');
    const addImg = document.getElementById('addImg');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/static/Funcionarios/Dark Mode/dark.css') {
        css.setAttribute('href', '/static/Funcionarios/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/static/IMAGENS IGUAIS/Light Mode/3 linhas preto.png'));
        editar.forEach(edit => edit.setAttribute('src', '/static/Funcionarios/Light Mode/user-avatar-preto.png'));
        addImg.setAttribute('src', '/static/Funcionarios/Light Mode/add.png'); // Muda para o modo claro

    } else {
        css.setAttribute('href', '/static/Funcionarios/Dark Mode/dark.css'); // Muda para o modo escuro
        editar.forEach(edit => edit.setAttribute('src', '/static/Funcionarios/Dark Mode/user-avatar branco.png'))
        linhas.forEach(linha => linha.setAttribute('src', '/static/IMAGENS IGUAIS/Dark Mode/3 linhas branco.png'));
        addImg.setAttribute('src', '/static/Funcionarios/Dark Mode/add-branco.png');

    }
}

// Função para destacar o Idioma
document.querySelectorAll('nav label').forEach(label => {
    label.addEventListener('click', function() {
        const selectedLanguage = this.textContent;
        
        // Destaca o idioma selecionado
        document.querySelectorAll('nav label').forEach(label => label.style.fontWeight = 'normal');
        this.style.fontWeight = 'bold';
        
        // Atualizar com base na língua destacada
        updateLanguage(selectedLanguage);
    });
});

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

//Função para o Idioma padrão
window.addEventListener('load', function() {
    const defaultLanguage = 'PT'; // Idioma padrão

    // Destaca o idioma padrão
    const defaultLabel = Array.from(document.querySelectorAll('nav label')).find(label => label.textContent === defaultLanguage);
    if (defaultLabel) {
        defaultLabel.style.fontWeight = 'bold';
    }

    // Atualizar com base na língua destacada
    updateLanguage(defaultLanguage);
});

function filtrarTabela() {
    // Obtém o valor digitado no campo de filtro e converte para minúsculas
    var input = document.getElementById("filtro");
    var filtro = input.value.toLowerCase();
    
    // Obtém a tabela e todas as linhas da tabela (tbody tr)
    var tabela = document.getElementById("tabelaFuncionarios");
    var tr = tabela.getElementsByTagName("tr");

    // Loop por todas as linhas da tabela, exceto o cabeçalho
    for (var i = 1; i < tr.length; i++) {
        var exibirLinha = false;
        
        // Obtém a célula de nome (índice 1)
        var tdNome = tr[i].getElementsByTagName("td")[1];
        if (tdNome) {
            var nomeTexto = tdNome.textContent || tdNome.innerText;
            if (nomeTexto.toLowerCase().indexOf(filtro) > -1) {
                exibirLinha = true;
            }
        }

        // Obtém a célula de cargo (índice 3)
        var tdCargo = tr[i].getElementsByTagName("td")[3];
        if (tdCargo) {
            var cargoTexto = tdCargo.textContent || tdCargo.innerText;
            if (cargoTexto.toLowerCase().indexOf(filtro) > -1) {
                exibirLinha = true;
            }
        }

        // Obtém a célula de idade (índice 2)
        var tdIdade = tr[i].getElementsByTagName("td")[2];
        if (tdIdade) {
            var idadeTexto = tdIdade.textContent || tdIdade.innerText;
            if (idadeTexto.toLowerCase().indexOf(filtro) > -1) {
                exibirLinha = true;
            }
        }

        // Se qualquer uma das condições de filtro foi atendida, mostra a linha; caso contrário, oculta
        if (exibirLinha) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

function filtrarMatricula() {
        // Obtém o valor digitado no campo de filtro e converte para minúsculas
        var input = document.getElementById("filtroMatricula");
        var filtro = input.value.toLowerCase();
        
        // Obtém a tabela e todas as linhas da tabela (tbody tr)
        var tabela = document.getElementById("tabelaFuncionarios");
        var tr = tabela.getElementsByTagName("tr");
    
        // Loop por todas as linhas da tabela, exceto o cabeçalho
        for (var i = 1; i < tr.length; i++) {
            // Obtém a célula de nome (índice 1)
            var tdMatricula = tr[i].getElementsByTagName("td")[0];
            if (tdMatricula) {
                // Se o nome contiver o texto do filtro, mostra a linha, caso contrário, oculta
                var tdMatriculaTexto = tdMatricula.textContent || tdMatricula.innerText;
                if (tdMatriculaTexto.toLowerCase().indexOf(filtro) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
}

function PDF() {
    // Seleciona o elemento da tabela para exportação
    var elementoTabela = document.querySelector('.tabela');

    // Configurações para o PDF
    var opt = {
        margin:       1,
        filename:     'relatorio_funcionarios.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Gera o PDF usando html2pdf e a tabela filtrada
    html2pdf().from(elementoTabela).set(opt).save();

}

function CSV() {
    // Seleciona a tabela HTML
    var tabela = document.querySelector('.tabela');
    
    // Converte a tabela para uma planilha
    var wb = XLSX.utils.table_to_book(tabela, {sheet: "Funcionarios"});
    
    // Exporta o arquivo Excel
    XLSX.writeFile(wb, "relatorio_funcionarios.xlsx");
}

function IMPRIMIR() {
    var divToPrint = document.querySelector('.tela-tabela'); // Selecione o contêiner que deseja imprimir
    var novaJanela = window.open("", "", "width=800,height=600");

    // Adiciona o conteúdo da nova janela com os estilos CSS incluídos
    novaJanela.document.write('<html><head><title>Imprimir Relatório</title>');
    novaJanela.document.write('<style>');
    novaJanela.document.write('body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #ffffff; }');
    novaJanela.document.write('header, .sidebar-background, .sidebar, .dark-mode { display: none; }'); // Oculta elementos desnecessários
    novaJanela.document.write('.tela-tabela { width: 100%; box-shadow: none; border: 1px solid #000000; border-radius: 0; }');
    novaJanela.document.write('.tabela { width: 100%; border-collapse: collapse; }');
    novaJanela.document.write('.tabela thead { background-color: #ffffff; color: #d0043c; }');
    novaJanela.document.write('.tabela thead th { padding: 12px 15px; text-align: left; border: 1px solid #ddd; }');
    novaJanela.document.write('.tabela tbody tr:nth-child(even) { background-color: #f4f4f9; }');
    novaJanela.document.write('.tabela tbody tr:hover { background-color: #ffffff; }'); // Remove o efeito de hover na impressão
    novaJanela.document.write('.tabela tbody td { padding: 12px 15px; border: 1px solid #ddd; word-wrap: break-word; }');
    novaJanela.document.write('.tabela td { max-width: 150px; word-wrap: break-word;}'); // Remove o limite de largura na impressão
    novaJanela.document.write('h1 { font-size: 1.2em; border-bottom: 1px solid #d0043c; }');
    novaJanela.document.write('.filtros { display: none; }'); // Oculta filtros na impressão
    novaJanela.document.write('</style>');
    novaJanela.document.write('</head><body >');
    novaJanela.document.write(divToPrint.outerHTML);
    novaJanela.document.write('</body></html>');
    novaJanela.document.close();
    novaJanela.focus(); // Necessário para IE
    novaJanela.print();
}

// Fecha o modal se clicar fora dele
window.onclick = function(event) {
    var modal = document.getElementById('modalNovoFuncionario');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
function abrirModal() {
    document.getElementById('modalNovoFuncionario').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalNovoFuncionario').style.display = 'none';
}

function abrirModalEdicao(id, nome, cargo, skills) {
    // Preenche os valores de nome e cargo
    document.getElementById('nomeEditar').value = nome;
    document.getElementById('cargoEditar').value = cargo;

    // Limpa as checkboxes de skills selecionadas
    const skillsCheckboxes = document.querySelectorAll('#skillsExistentes input[type="checkbox"]');
    skillsCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Marca as skills do funcionário como selecionadas
    skills.forEach(skill => {
        const skillCheckbox = document.getElementById(`skillEditar_${skill.id}`);
        if (skillCheckbox) {
            skillCheckbox.checked = true;
        }
    });

    // Define a ação do formulário de edição
    const formEditar = document.getElementById('formEditarFuncionario');
    formEditar.action = `/funcionarios/editar/${id}/`;

    // Exibe o modal de edição
    document.getElementById('modalEditarFuncionario').style.display = 'block';
}

function fecharModalEdicao() {
    document.getElementById('modalEditarFuncionario').style.display = 'none';
}



const inputField = document.getElementById('inputField');
const optionsList = document.getElementById('optionsList');
const cargoField = document.getElementById('cargoField');

// Lista de funcionários e seus respectivos cargos
const funcionarios = [
    { nome: 'Gerente', cargo: 'CR321' },
    { nome: 'Vendedora', cargo: 'CR320' },
    { nome: 'Desenvolvedor', cargo: 'CR319' },
    { nome: 'Designer', cargo: 'CR318' },
    { nome: 'Marketing', cargo: 'CR317' }
];

function filterOptions(value) {
    // Limpa as opções existentes
    optionsList.innerHTML = '';
    
    // Filtra os funcionários com base no valor digitado
    const filteredOptions = funcionarios.filter(funcionario => 
        funcionario.nome.toLowerCase().includes(value.toLowerCase())
    );
    
    // Adiciona as opções filtradas na lista
    filteredOptions.forEach(funcionario => {
        const optionItem = document.createElement('div');
        optionItem.classList.add('option-item');
        optionItem.textContent = funcionario.nome;
        
        // Adiciona o clique para preencher o input
        optionItem.addEventListener('click', () => {
            inputField.value = funcionario.nome;
            cargoField.value = funcionario.cargo; // Preenche o cargo automaticamente
            optionsList.style.display = 'none';
        });

        optionsList.appendChild(optionItem);
    });

    // Exibe a lista de opções
    if (filteredOptions.length > 0) {
        optionsList.style.display = 'block';
    } else {
        optionsList.style.display = 'none';
    }
}

// Exibe as opções quando o campo de entrada é clicado
inputField.addEventListener('focus', () => {
    filterOptions(inputField.value);
});

// Filtra as opções enquanto o usuário digita
inputField.addEventListener('input', () => {
    filterOptions(inputField.value);
});

// Esconde a lista de opções quando o usuário clica fora do input
document.addEventListener('click', (event) => {
    if (!event.target.closest('.autocomplete')) {
        optionsList.style.display = 'none';
    }
});

    function adicionarSkill() {
        const skillInput = document.getElementById('nova_skill');
        const skillValue = skillInput.value.trim();
        
        if (skillValue) {
            const skillContainer = document.getElementById('skillsContainer');
            
            // Cria o elemento de skill (tag)
            const skillTag = document.createElement('div');
            skillTag.classList.add('skill-tag');
            skillTag.innerText = skillValue;

            // Adiciona um botão de exclusão para a skill
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'X';
            deleteButton.classList.add('delete-skill');
            deleteButton.onclick = function() {
                skillContainer.removeChild(skillTag);
                hiddenInput.remove(); // Remove o input hidden correspondente
            };

            // Adiciona o botão de exclusão à tag de skill
            skillTag.appendChild(deleteButton);
            skillContainer.appendChild(skillTag);

            // Cria o input hidden para enviar a skill
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'skills[]'; // Envia como uma lista de skills no formulário
            hiddenInput.value = skillValue;
            skillContainer.appendChild(hiddenInput);

            // Limpa o input após adicionar a skill
            skillInput.value = '';
        }
    }