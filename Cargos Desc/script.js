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

//é como a função fala po, Abrir ou Fechar a Side bar kkkkkkkkk
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

// Realizar a troca do tema
function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/Jornada_site_brose/Cargos Desc/Dark Mode/dark.css') {
        css.setAttribute('href', '/Jornada_site_brose/Cargos Desc/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Cargos Desc/Light Mode/3 linhas preto.png'));

    } else {
        css.setAttribute('href', '/Jornada_site_brose/Cargos Desc/Dark Mode/dark.css'); // Muda para o modo escuro

        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Cargos Desc/Dark Mode/3 linhas branco.png'));

    }
}