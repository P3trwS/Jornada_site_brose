function selecionarTopico(element, topico) {
    const linhaAnimada = document.getElementById('linha-animada');
    const topicos = document.querySelectorAll('.topico');
    const index = Array.from(topicos).indexOf(element);

    linhaAnimada.style.width = `${element.offsetWidth}px`;
    linhaAnimada.style.left = `${element.offsetLeft}px`;

    topicos.forEach(topico => topico.style.color = '#000');
    element.style.color = '#f00'; // Change color of selected topic

    // Atualizar conteúdo com base no tópico selecionado
    atualizarConteudo(topico);
}

function atualizarConteudo(topico) {
    const cursos = document.getElementById('cursos');
    let html = '';

    switch (topico) {
        case 'basico':
            html = `
                <div class="páginas">
            <!-- Tópico por tópico -->
            <div class="página">
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

// Initialize the line position and content on page load
window.onload = function() {
    const topicoInicial = document.querySelector('.topico');
    selecionarTopico(topicoInicial, 'basico');
}
