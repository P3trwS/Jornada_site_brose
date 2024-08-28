document.getElementById('botão-dark').addEventListener('click', function() {
  var themeStyle = document.getElementById('css');
  var logo = document.getElementById('logo-login');
  var botão = document.getElementById('botão-dark');

  // Obtém o idioma atualmente selecionado
  var selectedLanguage = document.querySelector('nav label[style*="font-weight: bold"]').textContent;

  // Verifica o tema atual
  if (themeStyle.getAttribute('href') === 'static/dark.css') {
      themeStyle.setAttribute('href', 'static/light.css'); // Muda para o modo claro
      logo.setAttribute('src', 'static/light mode logo.png'); // Muda o logo
      botão.textContent = translations[selectedLanguage].lightMode; // Atualiza o texto do botão
  } else {
      themeStyle.setAttribute('href', 'static/dark.css'); // Muda para o modo escuro
      logo.setAttribute('src', 'static/dark mode logo.png'); // Volta o logo padrão
      botão.textContent = translations[selectedLanguage].darkMode; // Atualiza o texto do botão
  }

});

window.addEventListener('load', function() {
  var themeStyle = document.getElementById('css');
  var botão = document.getElementById('botão-dark');

  // Obtém o idioma atualmente selecionado
  var selectedLanguage = document.querySelector('nav label[style*="font-weight: bold"]').textContent;

  if (themeStyle.getAttribute('href') === 'static/dark.css') {
      botão.textContent = translations[selectedLanguage].darkMode;
  } else {
      botão.textContent = translations[selectedLanguage].lightMode;
  }
});

const translations = {
  PT: {
      username: "Usuário",
      password: "Senha",
      forgotPassword: "Esqueceu a senha?",
      login: "Entrar",
      darkMode: "Modo Escuro",
      lightMode: "Modo Claro"
  },
  EN: {
      username: "Username",
      password: "Password",
      forgotPassword: "Forgot password?",
      login: "Login",
      darkMode: "Dark Mode",
      lightMode: "Light Mode"
  },
  GR: {
      username: "Benutzername",
      password: "Passwort",
      forgotPassword: "Passwort vergessen?",
      login: "Anmelden",
      darkMode: "Dunkler Modus",
      lightMode: "Lichtmodus"
  }
};

function updateLanguage(language) {
  document.getElementById('username-label').textContent = translations[language].username;
  document.getElementById('senha-label').textContent = translations[language].password;
  document.getElementById('F-senha').textContent = translations[language].forgotPassword;
  document.querySelector('.botao-login').textContent = translations[language].login;

  // Atualiza o texto do botão de modo com base no tema atual
  var themeStyle = document.getElementById('css');
  if (themeStyle.getAttribute('href') === 'static/dark.css') {
      document.getElementById('botão-dark').textContent = translations[language].lightMode;
  } else {
      document.getElementById('botão-dark').textContent = translations[language].darkMode;
  }
}

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
  document.querySelector(`nav label:contains('${defaultLanguage}')`).style.fontWeight = 'bold';
  updateLanguage(defaultLanguage);
});
