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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');

    if (password !== confirmPassword) {
      alert('As senhas não coincidem. Por favor, tente novamente.');
      return;
    }

    try{
    await signUp(username, email, password)
        console.log('Usuário cadastrado com sucesso');
        window.location.hash = '#feed';
      }
      catch (error) {
        console.log('Erro de cadastro:', error);
        alert('Erro ao fazer cadastro. Verifique os dados informados e tente novamente.');
      }
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
