//VER OS COMENTARIOS DAS TRADUÇÕES


// Função para selecionar o tópico e para trocar as cores dos tópicos com base no selecionado
function selecionarTopico(element, topico) {
    const linhaAnimada = document.getElementById('linha-animada');
    const topicos = document.querySelectorAll('.topico');
    const index = Array.from(topicos).indexOf(element);
    const css = document.getElementById('css');

    //ajustar a largura da linha com base no texto
    linhaAnimada.style.width = `${element.offsetWidth}px`;
    linhaAnimada.style.left = `${element.offsetLeft}px`;

    //trocar a cor do topico com base no tema 
    if (css.getAttribute('href') === '/static/Cursos/Dark Mode/dark.css') {

        topicos.forEach(topico => topico.style.color = '#fff');
        element.style.color = '#f00'; // Change color of selected topic
    } else {
        topicos.forEach(topico => topico.style.color = '#000');
        element.style.color = '#f00'; // Change color of selected topic
    }

    // Atualizar conteúdo com base no tópico selecionado
    atualizarConteudo(topico);
}

//função que age em conjunto da selecionar topico. Ela é quem adiciona no HTML os cursos correspondentes


//Quando inicializa a página o topico padrão será o basico
window.onload = function() {
    const topicoInicial = document.querySelector('.topico');
    selecionarTopico(topicoInicial, 'basico');
}

// Realizar a troca do tema
function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/static/Cursos/Dark Mode/dark.css') {
        css.setAttribute('href', '/static/Cursos/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/static/Cursos/Light Mode/3 linhas preto.png'));

    } else {
        css.setAttribute('href', '/static/Cursos/Dark Mode/dark.css'); // Muda para o modo escuro

        linhas.forEach(linha => linha.setAttribute('src', '/static/Cursos/Dark Mode/3 linhas branco.png'));

    }

    //quando o topico volta ele começa com o basíco para resetar as cores 
    const topicoInicial = document.querySelector('.topico');
    selecionarTopico(topicoInicial, 'basico');      
};

//Traduções
//NÃO TEM TRADUÇÕES DE TUDO PQ DA MUITO TRABALHO DE TRADUZIR TUDO E ABRIR UM JSON PRA ISSO
//NA APRESENTAÇÃO NÃO CLICAR NAS TRADUÇÕES APENAS NO LOGIN E NA HOME
//VEJAM ISSO


//função para atualizar as linguas
function updateLanguage(language) {

    localStorage.setItem('selectedLanguage', language);

    document.getElementById('Cursos').textContent = translations[language].Cursos;
    document.getElementById('Cargos').textContent = translations[language].Cargos;
    document.getElementById('Perfil').textContent = translations[language].Perfil;
    document.getElementById('botão-dark').textContent = translations[language].alterarTema;
    document.getElementById('Home-sideBar').textContent = translations[language].Home;
    document.getElementById('Cursos-sideBar').textContent = translations[language].Cursos;
    document.getElementById('Cargos-sideBar').textContent = translations[language].Cargos;
    document.getElementById('Perfil-sideBar').textContent = translations[language].Perfil;
    document.getElementById('Menu-sideBar').textContent = translations[language].Menu;    

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