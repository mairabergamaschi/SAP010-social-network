import { signUp, signInWithGoogle, signInWithFacebook } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const cadastro = `
    <section class="form">
      <h2>Cadastro</h2>
      <form id="register" name="register">
        <label for="name">Nome completo:</label>
        <input type="text" id="name" name="name" autocomplete="name" required></input>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" autocomplete="email" required></input>

        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required></input>

        <label for="confirm-password">Confirmar senha:</label>
        <input type="password" id="confirm-password" name="confirm-password" required></input>

        <button type="submit">Cadastrar</button>
      </form>

      <p>ou cadastre-se com:</p>
      <div class="social-login">
        <a href="#login-google" class="google-login">Google</a>
        <a href="#login-facebook" class="facebook-login">Facebook</a>
      </div>
    </section>
  `;

  container.innerHTML = cadastro;

  const form = container.querySelector('form');
  const nameInput = container.querySelector('#name');
  const emailInput = container.querySelector('#email');
  const passwordInput = container.querySelector('#password');
  const confirmPasswordInput = container.querySelector('#confirm-password');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    // Lógica de cadastro com email e senha utilizando o Firebase
    signUp(name, email, password)
      .then(() => {
        // Cadastro bem-sucedido
        console.log('Usuário cadastrado com sucesso');
        // Redirecionar para a página desejada
        window.location.hash = '#feed';
      })
      .catch((error) => {
        // Ocorreu um erro no cadastro
        console.log('Erro de cadastro:', error);
        // Exibir mensagem de erro ao usuário
        alert('Erro ao fazer cadastro. Verifique os dados informados e tente novamente.');
      });
  });

  const googleLoginButton = container.querySelector('.google-login');
  googleLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithGoogle();
  });

  const facebookLoginButton = container.querySelector('.facebook-login');
  facebookLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithFacebook();
  });

  return container;
};
