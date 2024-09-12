function searchCargos() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const setores = document.querySelectorAll('.main-setor');
    let resultadosEncontrados = false;

    // Se a barra de pesquisa estiver vazia, mostra todos os setores e cargos
    if (input === '') {
        setores.forEach(function(setor) {
            setor.style.display = ''; // Mostra todos os setores
            const cargos = setor.querySelectorAll('.cargo');
            cargos.forEach(function(cargo) {
                cargo.style.display = ''; // Mostra todos os cargos
            });
        });
        document.getElementById("nenhumResultado").style.display = 'none'; // Esconde a mensagem de nenhum resultado
        return; // Sai da função porque a barra está vazia
    }

    // Loop para cada setor
    setores.forEach(function(setor) {
        const setorNome = setor.querySelector('.setor').textContent.toLowerCase();
        const cargos = setor.querySelectorAll('.cargo');
        let algumCargoVisivel = false;

        // Verifica se o setor está visível (se ele foi filtrado ou não)
        if (setor.style.display !== 'none') {
            // Se o nome do setor corresponder ao termo de busca, mostra o setor e todos os cargos
            if (setorNome.includes(input)) {
                setor.style.display = ''; // Mostra o setor
                cargos.forEach(function(cargo) {
                    cargo.style.display = ''; // Mostra todos os cargos do setor
                });
                resultadosEncontrados = true;
            } else {
                // Caso contrário, verifica se o termo está nos cargos
                cargos.forEach(function(cargo) {
                    const titulo = cargo.querySelector('.titulo-cargo').textContent.toLowerCase();
                    if (titulo.includes(input)) {
                        cargo.style.display = ''; // Mostra o cargo
                        algumCargoVisivel = true; // Marca que pelo menos um cargo está visível
                    } else {
                        cargo.style.display = 'none'; // Esconde o cargo
                    }
                });

                // Esconde ou mostra o setor, dependendo se há cargos visíveis
                if (algumCargoVisivel) {
                    setor.style.display = ''; // Mostra o setor se houver cargos visíveis
                    resultadosEncontrados = true;
                } else {
                    setor.style.display = 'none'; // Esconde o setor se nenhum cargo for visível
                }
            }
        }
    });

    // Mostrar ou esconder a mensagem de nenhum resultado encontrado
    const mensagemNenhumResultado = document.getElementById('nenhumResultado');
    if (resultadosEncontrados === true) {
        mensagemNenhumResultado.style.display = 'none'; // Esconde a mensagem
    } else {
        mensagemNenhumResultado.style.display = ''; // Mostra a mensagem
    }
}


function aplicarFiltros() {
    const filtros = document.querySelectorAll('.check-filtro input:checked');
    const setores = document.querySelectorAll('.main-setor');
    let setoresSelecionados = [];

    filtros.forEach(filtro => {
        setoresSelecionados.push(normalizarTexto(filtro.name));
    });

    if (setoresSelecionados.length === 0) {
        // Se não houver filtros, mostra todos os setores
        setores.forEach(setor => {
            setor.style.display = ''; // Mostra todos os setores
        });
        document.getElementById("nenhumResultado").style.display = 'none';
    } else {
        let algumSetorVisivel = false;

        setores.forEach(setor => {
            const nomeSetor = normalizarTexto(setor.querySelector('.setor').textContent.trim());

            if (setoresSelecionados.includes(nomeSetor)) {
                setor.style.display = '';
                algumSetorVisivel = true;
            } else {
                setor.style.display = 'none';
            }
        });

        if (!algumSetorVisivel) {
            document.getElementById("nenhumResultado").style.display = '';
        } else {
            document.getElementById("nenhumResultado").style.display = 'none';
        }
    }

    abrirOuFecharFiltro();
}

function abrirOuFecharFiltro() {
    const modalBackground = document.getElementsByClassName('modal-background')[0];
    const modal = document.getElementsByClassName('modal-filtro')[0];

    modalBackground.style.display = modalBackground.style.display === 'block' ? 'none' : 'block';
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function normalizarTexto(texto) {
    return texto
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s.]/g, '')
        .toLowerCase();
}

// Adiciona evento para aplicar os filtros ao clicar no botão de confirmação
document.getElementById('confirmar-filtro').addEventListener('click', aplicarFiltros);

// Adiciona um evento ao input de busca para pesquisar conforme o usuário digita
document.getElementById('searchBar').addEventListener('input', searchCargos);


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