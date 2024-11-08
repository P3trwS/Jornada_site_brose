
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


// Realizar a troca do tema
function darkMode() {
    const css = document.getElementById('css');
    const cursos = document.getElementById('imagem-cursos');
    //Selecionar os 2 botões da sideBar com base no alt
    const linhas = document.querySelectorAll('img[alt="3 linhas"]');

    //Operação para a troca de tema
    if (css.getAttribute('href') === '/static/Home Page/Dark Mode/home page dark mode.css') {
        css.setAttribute('href', '/static/Home Page/Light Mode/home page light mode.css'); // Muda para o modo claro
        cursos.setAttribute('src', '/static/Home Page/Light Mode/cursos_brose-removebg-preview.png'); // Muda o logo
        linhas.forEach(linha => linha.setAttribute('src', '/static/Home Page/Light Mode/3 linhas preto.png'));

    } else {
        css.setAttribute('href', '/static/Home Page/Dark Mode/home page dark mode.css'); // Muda para o modo escuro
        cursos.setAttribute('src', '/static/Home Page/Dark Mode/Cursos dark mode.png'); // Volta o logo padrão
        linhas.forEach(linha => linha.setAttribute('src', '/static/Home Page/Dark Mode/3 linhas branco.png'));

    }
};

//Traduções
const translations = {
    PT: {
        Menu: "Menu",
        Home: "Home",
        Cursos: "Cursos",
        Cargos: "Cargos",
        Perfil: "Funcionários",
        descCursos: "Aqui você poderá ver os cursos disponíveis, realizando eles terá o certificado e adicionando a skill equivalente ao seu perfil.",
        descCargos: "Poderá ser visto os cargos disponíveis dentro da Brose. Para que assim tenha a possibilidade de evoluir de cargos ou ver o que é necessário para atingir a vaga desejada.",
        descPerfil: "Os colaboradores se encontram aqui. Podendo ver suas certificações, histórico e skills.",

        alterarTema: "Mudar Tema"
    },
    EN: {
        Menu: "Menu",
        Home: "Home",
        Cursos: "Courses",
        Cargos: "Positions",
        Perfil: "Profile",
        descCursos: "Here you can see the available courses, and upon completion, you will receive a certificate and add the corresponding skill to your profile.",
        descCargos: "You can view the available positions within Brose. This way, you can see the requirements for promotion or what is necessary to achieve the desired position.",
        descPerfil: "Your Profile is here. You can view your certifications, history, and skills.",
        alterarTema: "Change Theme",
    },
    GR: {
        Menu: "Speisekarte",
        Home: "Heim",
        Cursos: "Kurse",
        Cargos: "Positionen",
        Perfil: "Profil",
        descCursos: "Hier können Sie die verfügbaren Kurse sehen. Nach Abschluss erhalten Sie ein Zertifikat und fügen die entsprechende Fähigkeit zu Ihrem Profil hinzu.",
        descCargos: "Sie können die verfügbaren Positionen bei Brose einsehen. So können Sie sehen, welche Anforderungen für eine Beförderung erforderlich sind oder was notwendig ist, um die gewünschte Position zu erreichen.",
        descPerfil: "Ihr Profil ist hier. Sie können Ihre Zertifizierungen, Ihren Verlauf und Ihre Fähigkeiten einsehen.",
        alterarTema: "Thema ändern",

    }
};

//Função para atualizar a língua com base na língua selecionada
function updateLanguage(language) {

    //Armazena no LocalStorage se quiser realizar um load em outras páginas da Língua
    localStorage.setItem('selectedLanguage', language);

    document.getElementById('Cursos').textContent = translations[language].Cursos;
    document.getElementById('Cargos').textContent = translations[language].Cargos;
    document.getElementById('Perfil').textContent = translations[language].Perfil;
    document.getElementById('descCursos').textContent = translations[language].descCursos;
    document.getElementById('descCargos').textContent = translations[language].descCargos;
    document.getElementById('descPerfil').textContent = translations[language].descPerfil;
    document.getElementById('botaoCursos').textContent = translations[language].Cursos;
    document.getElementById('botaoCargos').textContent = translations[language].Cargos;
    document.getElementById('botaoPerfil').textContent = translations[language].Perfil;
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
