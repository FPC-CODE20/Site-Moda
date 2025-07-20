// Aguarda o conteúdo da página ser totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- SISTEMA DE TEMA (DARK/LIGHT MODE) ---

    // Seleciona os elementos do DOM
    const themeToggleButton = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // O elemento <html>

    // Função para aplicar o tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    };

    // Função para alternar o tema e salvar a preferência
    const toggleTheme = () => {
        // Verifica se a classe 'dark' já existe no elemento <html>
        const isDarkMode = htmlElement.classList.contains('dark');
        
        if (isDarkMode) {
            applyTheme('light'); // Se está no modo escuro, muda para o claro
            localStorage.setItem('theme', 'light'); // Salva a preferência
        } else {
            applyTheme('dark'); // Se está no modo claro, muda para o escuro
            localStorage.setItem('theme', 'dark'); // Salva a preferência
        }
    };

    // VERIFICAÇÃO INICIAL AO CARREGAR A PÁGINA
    // 1. Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Ou verifica a preferência do sistema operacional do usuário
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        // Se encontrou um tema salvo, aplica-o
        applyTheme(savedTheme);
    } else if (prefersDark) {
        // Se não houver tema salvo, usa a preferência do sistema
        applyTheme('dark');
    } else {
        // Caso contrário, o padrão é o tema claro
        applyTheme('light');
    }

    // Adiciona o evento de clique ao botão de alternância de tema
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }


    // --- LÓGICA PARA OS MODAIS (Exemplo de como abrir o modal de login) ---
    
    const userIconButton = document.getElementById('user-icon-button');
    const loginModal = document.getElementById('login-modal');
    const closeLoginModalButton = document.getElementById('close-login-modal');

    if(userIconButton && loginModal && closeLoginModalButton) {
        // Abrir modal
        userIconButton.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
        });

        // Fechar modal
        closeLoginModalButton.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });

        // Fechar modal clicando fora dele
        loginModal.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                loginModal.classList.add('hidden');
            }
        });
    }

    // Adicione aqui a lógica para os outros modais (cadastro, etc.) seguindo o mesmo padrão.
    const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const senha = document.getElementById('login-senha').value;

        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', senha);

        const resposta = await fetch('login.php', {
            method: 'POST',
            body: formData
        });

        const resultado = await resposta.json();

        if (resultado.status === 'ok') {
            alert('Login realizado com sucesso!');
            window.location.href = '/dashboard.html'; // redireciona após login
        } else {
            alert('Erro: ' + resultado.mensagem);
        }
    });
}

});
