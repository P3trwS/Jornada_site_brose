function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/Jornada_site_brose/Funcionarios/Dark Mode/dark.css') {
        css.setAttribute('href', '/Jornada_site_brose/Funcionarios/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Funcionarios/Light Mode/3 linhas preto.png'));

    } else {
        css.setAttribute('href', '/Jornada_site_brose/Funcionarios/Dark Mode/dark.css'); // Muda para o modo escuro

        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Funcionarios/Dark Mode/3 linhas branco.png'));

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
    var elementoTabela = document.querySelector('.tela-tabela');

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

function abrirOuFecharModal() {
    const modalBackground = document.querySelector('.modalCadastro-background');
    const modal = document.querySelector('.modalCadastro');

    if (modalBackground.style.display === "block") {
        modalBackground.style.display = "none";
    } else {
        modalBackground.style.display ="block";
    }

    if (modal.style.display === "block") {
        modal.style.display = "none"; 
    } else {
        modal.style.display = "block";
    }
}