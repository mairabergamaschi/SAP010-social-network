import { auth } from '../../firebase/firebase';
import {
  loginWithEmail,
  loginGoogle,
  loginFacebook,
} from '../../firebase/auth.js';
import { errorsFirebase } from '../../validations.js';
import logologin from '../../images/Logoverde.png';
import icongoogle from '../../images/iconGoogle.png';
import iconfacebook from '../../images/iconFacebook.png';
import { showSuccessNotification } from '../../toastify.js';

// formulario de login
export default () => {
  const container = document.createElement('div');

  const templateLogin = `
    <section class='login-wrap'>
      <div class='left'>
        <figure class='logo-container'>
          <img src= ${logologin} class='logo' alt='Logo da Ladies On The Go!'>
        </figure>
        <h1 class='title'>Bem-vinda ao Ladies on the Go, a rede social dedicada a mulheres que viajam sozinhas ou em grupos de mulheres! Planeje suas aventuras, encontre companheiras de viagem, descubra destinos emocionantes e compartilhe suas próprias experiências.</h1>
        <br>
        <h6 class='text-slogan'>A rede social da mulher que viaja.</h6>
      </div>
      <div class='right'>
          <form class='login-form'>
          <br>

          <h2 class='subtitle'>Login</h2>
          <div class='inputs-container'>
            <input type='text' class='inputs-info' placeholder='E-MAIL' id='email' />
            <input type='password' class='inputs-info' placeholder='SENHA' id='senha' />
            <button type='button' id='show-password' class='button-eye'>
            <span class="icon-eye"><i class='fas fa-eye-slash'></i></span> 
            </button>
          </div>
          <nav>
            <button type='button' id='login-button' class='submit' href='#'>ENTRAR</button>
          </nav>
          <p id='error-message' class='error-message'></p>
            <button type='button' class='forgot-password'>Recuperar senha</button><br>
            <button type='button' class='register-here'><a href='#register' class='register-here'>Cadastrar</a></button>
          <div class='text'>
            Entrar com:
          </div>
          <figure>
            <button type='button' class='google-button' id='google-button'>
              <img src= '${icongoogle}' class='google-img' alt='Logo do Google'>
            </button>
            <button type='button' class='facebook-button' id='facebook-button'>
              <img src='${iconfacebook}' class='facebook-img' alt='Logo do facebook'>
            </button>
            <p id='errorLogar' class='error-message'></p>
          </figure>
        </form>
      </div>
    </section>`;

  container.innerHTML = templateLogin;

  const emailInput = container.querySelector('#email');
  const senhaInput = container.querySelector('#senha');
  const loginButton = container.querySelector('#login-button');
  const googleButton = container.querySelector('#google-button');
  const facebookButton = container.querySelector('#facebook-button');
  const forgotPasswordButton = container.querySelector('.forgot-password');

  // messagens de erro
  function printErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
  }
  function printErrorMessage2(message) {
    const errorMessage = document.getElementById('errorLogar');
    errorMessage.textContent = message;
  }

  const handleLogin = () => {
    const email = emailInput.value;
    const senha = senhaInput.value;

    loginWithEmail(email, senha)
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch((error) => {
        const errorMessage = errorsFirebase(error.code) || 'Usuário e/ou senha incorretos.';
        printErrorMessage(errorMessage);
      });
  };

  const handleForgotPassword = () => {
    const email = emailInput.value;
    auth.sendPasswordResetEmail(email)
      .then(() => {
        showSuccessNotification('Um e-mail foi enviado para redefinir sua senha. Verifique sua caixa de entrada.');
      })
      .catch((error) => {
        const errorMessage = errorsFirebase(error.code) || 'Falha ao enviar e-mail de recuperação de senha.';
        printErrorMessage(errorMessage);
      });
  };

  const handleGoogleLogin = () => {
    loginGoogle()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        printErrorMessage2('Erro ao logar com Google');
      });
  };

  const handleFacebookLogin = () => {
    loginFacebook()
      .then(() => {
        window.location.hash = '#timeline';
      })
      .catch(() => {
        printErrorMessage2('Erro ao logar com Facebook');
      });
  };

  // clicar
  loginButton.addEventListener('click', handleLogin);

  googleButton.addEventListener('click', handleGoogleLogin);

  facebookButton.addEventListener('click', handleFacebookLogin);

  forgotPasswordButton.addEventListener('click', handleForgotPassword);

  const button = container.querySelector('.button-eye');
  button.addEventListener('click', () => {
    const changeEye = container.querySelector('i');
    const input = container.querySelector('#senha');
    if (input.getAttribute('type') === 'text') {
      input.setAttribute('type', 'password');
      changeEye.classList.remove('fa-eye');
      changeEye.classList.add('fa-eye-slash');
    } else {
      input.setAttribute('type', 'text');
      changeEye.classList.remove('fa-eye-slash');
      changeEye.classList.add('fa-eye');
    }
  });

  return container;
};
