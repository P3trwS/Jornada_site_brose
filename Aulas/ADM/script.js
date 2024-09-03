document.addEventListener('DOMContentLoaded', function () {
    const videoList = document.getElementById('video-list');
    const videoPlayer = document.getElementById('main-video');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');

    videoList.addEventListener('click', function (e) {
        const target = e.target.closest('li');
        if (target) {
            const videoSrc = target.getAttribute('data-video');
            const title = target.getAttribute('data-title');
            const description = target.getAttribute('data-description');

            videoPlayer.src = videoSrc;
            videoTitle.textContent = title;
            videoDescription.textContent = description;

            videoPlayer.play();
        }
    });
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

//Função para o Idioma padrão
window.addEventListener('load', function() {
    const defaultLanguage = 'PT'; // Idioma padrão

    // Destaca o idioma padrão
    const defaultLabel = Array.from(document.querySelectorAll('nav label')).find(label => label.textContent === defaultLanguage);
    if (defaultLabel) {
        defaultLabel.style.fontWeight = 'bold';
    }


});

// Função para destacar o Idioma
document.querySelectorAll('nav label').forEach(label => {
    label.addEventListener('click', function() {
        const selectedLanguage = this.textContent;
        
        // Destaca o idioma selecionado
        document.querySelectorAll('nav label').forEach(label => label.style.fontWeight = 'normal');
        this.style.fontWeight = 'bold';
        

    });
});

function darkMode() {
    const css = document.getElementById('css');
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/Jornada_site_brose/Aulas/dark/dark.css') {
        css.setAttribute('href', '/Jornada_site_brose/Aulas/light/light.css'); // Muda para o modo claro
        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Aulas/light/3 linhas preto.png'));

    } else {
        css.setAttribute('href', '/Jornada_site_brose/Aulas/dark/dark.css'); // Muda para o modo escuro

        linhas.forEach(linha => linha.setAttribute('src', '/Jornada_site_brose/Aulas/dark/3 linhas branco.png'));

    }

    //quando o topico volta ele começa com o basíco para resetar as cores 
    const topicoInicial = document.querySelector('.topico');
    selecionarTopico(topicoInicial, 'basico');      
};



document.addEventListener("DOMContentLoaded", function() {
    const perguntas = {
        1: {
            titulo: "Pergunta 1",
            imagem: "/Jornada_site_brose/Aulas/ADM/pergunta1.png",
            opcoes: [
                "Maximizar o lucro da organização sem considerar a sustentabilidade.",
                "Controlar e alocar eficientemente os recursos da organização para alcançar os objetivos estabelecidos.",
                "Delegar todas as decisões estratégicas aos funcionários de nível operacional.",
                "Focar exclusivamente na redução de custos, independentemente das consequências para a qualidade dos produtos."
            ],
            correta: 2  // A resposta correta é a opção 2
        },
        2: {
            titulo: "Pergunta 2",
            imagem: "/Jornada_site_brose/Aulas/ADM/pergunta 2.png",
            opcoes: [
                "Delegar todas as decisões para os funcionários sem qualquer supervisão.",
                "Focar apenas nos resultados financeiros, ignorando o desempenho operacional.",
                "Monitorar o desempenho e tomar medidas corretivas para garantir que os objetivos sejam alcançados.",
                "Impedir que os funcionários assumam responsabilidades para evitar erros."
            ],
            correta: 3  // A resposta correta é a opção 4
        },
        3: {
            titulo: "Pergunta 3",
            imagem: "/Jornada_site_brose/Aulas/pergunta3.png",
            opcoes: [
                "Expandir a capacidade de produção.",
                "Aumentar o número de produtos fabricados.",
                "Controlar os custos operacionais.",
                "Estabelecer metas de longo prazo."
            ],
            correta: 3  // A resposta correta é a opção 3
        }
        // Adicione mais perguntas conforme necessário
    };

    let perguntaAtual = 1;
    let perguntasRespondidas = new Set(); // Para armazenar IDs das perguntas respondidas
    let botaoConfirmar = document.querySelector('.confirmar-resposta');

            // Função para carregar uma pergunta específica
            function carregarPergunta(idPergunta) {
                const pergunta = perguntas[idPergunta];
                document.getElementById('pergunta-titulo').innerText = pergunta.titulo;
                document.getElementById('pergunta-imagem').src = pergunta.imagem;
    
                const inputs = document.querySelectorAll('.input');
                const feedbacks = document.querySelectorAll('.errado-certo');
    
                inputs.forEach((input, index) => {
                    const radio = input.querySelector('input[type="radio"]');
                    const label = input.querySelector('label');
                    const feedback = input.querySelector('.errado-certo');
                    const optionIndex = index + 1;
    
                    radio.value = optionIndex;
                    label.innerText = pergunta.opcoes[index];
                    feedback.style.display = 'none';
                });
    
                document.querySelectorAll('.playlist-perguntas .pergunta').forEach(label => {
                    label.style.fontWeight = 'normal';
                    label.classList.remove('respondida'); // Remove a classe de respondida
                    label.style.pointerEvents = 'auto'; // Reabilita o clique
                    label.style.opacity = 1; // Reestabelece a opacidade
                });
                document.querySelector(`.playlist-perguntas [data-pergunta="${idPergunta}"]`).style.fontWeight = 'bold';
    
                // Reabilitar o botão ao carregar uma nova pergunta
                botaoConfirmar.disabled = false;
                botaoConfirmar.style.opacity = 1; // Restabelece a opacidade
            }
    
            // Função para processar a resposta
            function processarResposta() {
                const selectedOption = document.querySelector('input[name="resposta"]:checked');
                if (selectedOption) {
                    const respostaSelecionada = parseInt(selectedOption.value, 10);
                    const pergunta = perguntas[perguntaAtual];
                    const feedbacks = document.querySelectorAll('.errado-certo');
            
                    feedbacks.forEach((feedback, index) => {
                        if (index + 1 === pergunta.correta) {
                            feedback.innerHTML = '&check;';
                            feedback.style.display = 'block';
                            feedback.style.color = 'green';
                        } else if (index + 1 === respostaSelecionada) {
                            feedback.innerHTML = '&times;';
                            feedback.style.display = 'block';
                            feedback.style.color = '#d0043c';
                        }
                    });
    
                    // Marcar a pergunta como respondida
                    perguntasRespondidas.add(perguntaAtual);
                    document.querySelector(`.playlist-perguntas [data-pergunta="${perguntaAtual}"]`).classList.add('respondida');
                    document.querySelector(`.playlist-perguntas [data-pergunta="${perguntaAtual}"]`).style.pointerEvents = 'none'; // Desabilitar o clique
                    document.querySelector(`.playlist-perguntas [data-pergunta="${perguntaAtual}"]`).style.opacity = 0.5; // Indicar que foi respondida
            
                    // Desativa o botão para evitar múltiplos cliques
                    botaoConfirmar.disabled = true;
                    botaoConfirmar.style.opacity = 0.5; // Opcional: diminui a opacidade para indicar que o botão está desativado
                } else {
                    alert('Selecione uma resposta.');
                }
            }
    
            // Carrega a primeira pergunta ao iniciar
            carregarPergunta(perguntaAtual);
    
            // Evento para o botão de confirmar resposta
            botaoConfirmar.addEventListener('click', processarResposta);
    
            // Evento para mudar a pergunta ao clicar na playlist
            document.querySelectorAll('.playlist-perguntas .pergunta').forEach(label => {
                label.addEventListener('click', () => {
                    const idPergunta = parseInt(label.getAttribute('data-pergunta'), 10);
                    if (!perguntasRespondidas.has(idPergunta)) { // Verifica se a pergunta já foi respondida
                        perguntaAtual = idPergunta;
                        carregarPergunta(perguntaAtual);
                    }
                });
            });
    
        // Evento para o botão de finalizar prova
        document.querySelector('.confirmar-prova').addEventListener('click', () => {
            const confirmarFinalizacao = window.confirm('Tem certeza de que deseja finalizar a prova?');
            if (confirmarFinalizacao) {
                alert('Prova finalizada!');
                abrirModal('modalBack', 'modal')
                // Aqui você pode adicionar a lógica para finalizar a prova, como enviar os dados ou redirecionar o usuário.
            } else {
                // Se o usuário cancelar, a prova continua.
                alert('Continuação da prova.');
            }
        });
    });
    
    function abrirModal(modalBack, modalId) {

        const modalBackground = document.getElementById(modalBack);
        const modal = document.getElementById(modalId);
    
        if (modalBackground && modal) {
            if (modal.style.display === "block") {
                modal.style.display = "none";
                modalBackground.style.display = "none";
            } else {
                modal.style.display = "block";
                modalBackground.style.display = "block";
            }
        }
    }
    
    function fazerProva(modalBack, modal) {
        const confirmarProva = window.confirm('Tem certeza de que deseja fazer a prova?');

        if (confirmarProva === false) {
            alert("Prova não será iniciada")
            // Aqui você pode adicionar a lógica para finalizar a prova, como enviar os dados ou redirecionar o usuário.
        } else {
            abrirModal(modalBack, modal)
        }
    }

