function filtrarTabela() {
    // Obtém o valor do campo de filtro
    const filtro = document.getElementById("filtroMatricula").value.toUpperCase();
    
    // Obtém a tabela e as linhas do corpo da tabela
    const tabela = document.getElementById("tabelaFuncionarios");
    const linhas = tabela.getElementsByTagName("tr");
    
    // Itera sobre as linhas da tabela (começando da 1 para ignorar o cabeçalho)
    for (let i = 1; i < linhas.length; i++) {
        let exibirLinha = false; // Flag para indicar se a linha deve ser exibida
        
        // Obtém todas as células da linha
        const colunas = linhas[i].getElementsByTagName("td");

        // Itera sobre as células da linha
        for (let j = 0; j < colunas.length; j++) {
            const textoColuna = colunas[j].textContent || colunas[j].innerText;

            // Verifica se o conteúdo da célula contém o valor do filtro
            if (textoColuna.toUpperCase().indexOf(filtro) > -1) {
                exibirLinha = true; // Se encontrar uma correspondência, marca para exibir a linha
                break; // Sai do loop assim que encontrar a correspondência em uma coluna
            }
        }

        // Exibe ou esconde a linha com base no resultado da busca
        if (exibirLinha) {
            linhas[i].style.display = ""; // Mostra a linha
        } else {
            linhas[i].style.display = "none"; // Esconde a linha
        }
    }
}




function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');
    const filtro = document.getElementsByClassName('filtroBotao')[0];

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/Jornada_site_brose/Cargos/Dark Mode/dark.css') {
        css.setAttribute('href', '/Jornada_site_brose/Cargos/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/IMAGENS IGUAIS/Light Mode/3 linhas preto.png'));
        filtro.setAttribute('src', '/Jornada_site_brose/Cargos/Light Mode/settings.png')

    } else {
        css.setAttribute('href', '/Jornada_site_brose/Cargos/Dark Mode/dark.css'); // Muda para o modo escuro

        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/IMAGENS IGUAIS/Dark Mode/3 linhas branco.png'));
        filtro.setAttribute('src', '/Jornada_site_brose/Cargos/Dark Mode/settings branco.png')

    }

    //quando o topico volta ele começa com o basíco para resetar as cores 
    const topicoInicial = document.querySelector('.topico');
    selecionarTopico(topicoInicial, 'basico');      
};

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
    novaJanela.document.write('.editar-imagem { background: none; border: none; cursor: pointer; position: relative; display: inline-block; }')
    novaJanela.document.write('.editar-imagem img { width: 2vw; display: block; }')
    novaJanela.document.write('.filtros { display: none; }'); // Oculta filtros na impressão
    novaJanela.document.write('</style>');
    novaJanela.document.write('</head><body >');
    novaJanela.document.write(divToPrint.outerHTML);
    novaJanela.document.write('</body></html>');
    novaJanela.document.close();
    novaJanela.focus(); // Necessário para IE
    novaJanela.print();
}

function CSV() {
    // Seleciona a tabela HTML
    var tabela = document.querySelector('.tabela');
    
    // Converte a tabela para uma planilha
    var wb = XLSX.utils.table_to_book(tabela, {sheet: "Cargos"});
    
    // Exporta o arquivo Excel
    XLSX.writeFile(wb, "relatorio_cargos.xlsx");
}

function PDF() {
    // Seleciona o elemento da tabela para exportação
    var elementoTabela = document.querySelector('.tabela');

    // Configurações para o PDF
    var opt = {
        margin:       1,
        filename:     'relatorio_cargos.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Gera o PDF usando html2pdf e a tabela filtrada
    html2pdf().from(elementoTabela).set(opt).save();

}