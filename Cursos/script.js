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
    if (css.getAttribute('href') === '/Jornada_site_brose/Cursos/Dark Mode/dark.css') {

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
function atualizarConteudo(topico) {
    const cursos = document.getElementById('cursos');
    let html = '';

    //aqui tem a parte do Html que será inserido com base no tópico, irei comentar o html aqui pois no arquivo não existe essas linhas
    switch (topico) {
        //Quando no site selecionado o tópico básico, essas linhas são inseridas no html
        case 'basico':
            html = `
                <div class="páginas">
            <!-- Tópico por tópico -->
            <div class="página">
            <!-- Descrição do Curso correspondente, sendo imagem, nome e descrição do curso respectivamente. -->
                <img id="imagem-cursos" src="icone adm básico.png">
                <h1 id="Cursos">Administração Básica</h1>
                <O id="descCursos"> Este curso é ideal para iniciantes e profissionais <br> que desejam entender os princípios essenciais da <br>administração e como aplicá-los no ambiente de trabalho.</p>
                <!-- Botões para ir para a página respectiva -->
                <button id="botaoCursos" class="botãoHome">Acessar Curso</button>
            </div>

            <div class="página">
                <img id="imagem-cargos" src="icone mecanica.png">
                <h1 id="Cargos">Mecânica Básica</h1>
                <p id="descCargos">O Curso de Mecânica Básica oferece uma base sólida em princípios e práticas fundamentais da mecânica.</p>
                <button id="botaoCargos" class="botãoHome">Acessar Curso</button>
            </div>

            <div id="perfil-home" class="página">
                <img id="imagem-perfil" src="trabalho.png">
                <h1 id="Perfil">Segurança do Trabalho Básico</h1>
                <p id="descPerfil">O Curso de Segurança do Trabalho Básico proporciona uma introdução aos princípios fundamentais da segurança no ambiente de trabalho.</p>
                <button id="botaoPerfil" class="botãoHome">Acessar Curso</button>

            </div>
        </div>
            `;
            break;
            //quando selecionado intermediário será inserido essas linhas
        case 'intermediario':
            html = `
                                <div class="páginas">
            <!-- Tópico por tópico -->
            <div class="página">
                <img id="imagem-cursos" src="excel.png">
                <h1 id="Cursos">Excel Básico</h1>
                <p id="descCursos">O Curso de Excel Básico é ideal para iniciantes que desejam aprender a usar o 
                    Microsoft Excel para tarefas cotidianas e aprimorar suas habilidades em análise de dados.</p>
                <!-- Botões para ir para a página respectiva -->
                <button id="botaoCursos" class="botãoHome">Acessar Curso</button>
            </div>

            <div class="página">
                <img id="imagem-cargos" src="sistemas-de-ti.png">
                <h1 id="Cargos">T.I Infraestrutura</h1>
                <p id="descCargos">O Curso de Tecnologia da Informação com Ênfase em Infraestrutura <br> é projetado para profissionais que desejam especializar-se <br> na criação, manutenção e gestão de ambientes de TI <br> robustos e eficientes.</p>
                <button id="botaoCargos" class="botãoHome">Acessar Curso</button>
            </div>

            <div id="perfil-home" class="página">
                <img id="imagem-perfil" src="bolsa-de-dinheiro.png">
                <h1 id="Perfil">Matemática Financeira Básica</h1>
                <p id="descPerfil">O Curso de Matemática Financeira Básica é ideal para quem deseja entender e 
                    aplicar conceitos fundamentais de finanças pessoais e empresariais.</p>
                <button id="botaoPerfil" class="botãoHome">Acessar Curso</button>
            </div>

        </div>
            `;
            break;
            //Por fim quando é selecionado avançado, é colocado essas linhas
            //Por que logica de programação ta como avançado? Sla porra 
        case 'avançado':
            html = `
    <div class="páginas">
        <div id="perfil-home" class="página">
            <img id="imagem-perfil" src="sinais-de-codigo.png">
            <h1 id="Perfil">Lógica de Programação</h1>
            <p id="descPerfil">O Curso de Lógica de Programação é ideal para quem deseja desenvolver uma base sólida em conceitos fundamentais de programação, independentemente da linguagem utilizada.</p>
            <button id="botaoPerfil" class="botãoHome">Acessar Curso</button>
        </div>

    </div>
            `;
            break;
    }

    cursos.innerHTML = html;
}

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
    if (css.getAttribute('href') === '/Jornada_site_brose/Cursos/Dark Mode/dark.css') {
        css.setAttribute('href', '/Jornada_site_brose/Cursos/Light Mode/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Cursos/Light Mode/3 linhas preto.png'));

    } else {
        css.setAttribute('href', '/Jornada_site_brose/Cursos/Dark Mode/dark.css'); // Muda para o modo escuro

        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Cursos/Dark Mode/3 linhas branco.png'));

    }

    //quando o topico volta ele começa com o basíco para resetar as cores 
    const topicoInicial = document.querySelector('.topico');
    selecionarTopico(topicoInicial, 'basico');      
};

//Traduções
//NÃO TEM TRADUÇÕES DE TUDO PQ DA MUITO TRABALHO DE TRADUZIR TUDO E ABRIR UM JSON PRA ISSO
//NA APRESENTAÇÃO NÃO CLICAR NAS TRADUÇÕES APENAS NO LOGIN E NA HOME
//VEJAM ISSO


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