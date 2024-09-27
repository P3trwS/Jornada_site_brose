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