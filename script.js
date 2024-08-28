
// Carregar a página já com o idioma padrão.
window.addEventListener('load', function() {
    const defaultLanguage = 'PT'; // Idioma padrão
    document.querySelector(`nav label:contains('${defaultLanguage}')`).style.fontWeight = 'bold';
    updateLanguage(defaultLanguage);
});


// Função para o botão de Alterar o tema, para alterar o Css com base no ID
document.getElementById('botão-dark').addEventListener('click', function() {
    var themeStyle = document.getElementById('css');
    
    // Verifica o tema atual
    if (themeStyle.getAttribute('href') === 'dark.css') {
        themeStyle.setAttribute('href', 'light.css'); // Muda para o modo claro
        
    } else {
        themeStyle.setAttribute('href', 'dark.css'); // Muda para o modo escuro
        
    }
});

// Traduções
const translations = {
    PT: {
        username: "Usuário",
        password: "Senha",
        forgotPassword: "Esqueceu a senha?",
        login: "Entrar",
        darkMode: "Modo Escuro",
        alterarTema: "Mudar Tema"
    },
    EN: {
        username: "Username",
        password: "Password",
        forgotPassword: "Forgot password?",
        login: "Login",
        alterarTema: "Change Theme",
    },
    GR: {
        username: "Benutzername",
        password: "Passwort",
        forgotPassword: "Passwort vergessen?",
        login: "Anmelden",
        alterarTema: "Thema ändern",
    }
};

// Função para atualizar a língua
function updateLanguage(language) {
    document.getElementById('username-label').textContent = translations[language].username;
    document.getElementById('senha-label').textContent = translations[language].password;
    document.getElementById('F-senha').textContent = translations[language].forgotPassword;
    document.querySelector('.botao-login').textContent = translations[language].login;
    document.getElementById('botão-dark').textContent = translations[language].alterarTema

}

// Destacar Idioma
document.querySelectorAll('nav label').forEach(label => {
    label.addEventListener('click', function() {
        const selectedLanguage = this.textContent;
        
        // Destaca o idioma selecionado
        document.querySelectorAll('nav label').forEach(label => label.style.fontWeight = 'normal');
        this.style.fontWeight = 'bold';
        
        updateLanguage(selectedLanguage);
    });
});

// Configura o idioma padrão ao carregar a página
window.addEventListener('load', function() {
    const defaultLanguage = 'PT'; // Idioma padrão

    // Destaca o idioma padrão
    const defaultLabel = Array.from(document.querySelectorAll('nav label')).find(label => label.textContent === defaultLanguage);
    if (defaultLabel) {
        defaultLabel.style.fontWeight = 'bold';
    }

    updateLanguage(defaultLanguage);
});
