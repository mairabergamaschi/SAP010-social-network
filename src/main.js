import home from './pages/Home/home.js';
import login from './pages/Login/login.js';
import cadastro from './pages/Cadastro/cadastro.js';
import feed from './pages/Feed/feed.js';
import perfil from './pages/Perfil/perfil.js';
import editarPerfil from './pages/Editar/editar.js';
import { signInWithGoogle, signInWithFacebook, checkLoggedUser } from './firebase/auth.js';

const main = document.querySelector('#root');
const init = async () => {
  const renderPage = async () => {
    main.innerHTML = '';

    switch (window.location.hash) {
      case '#home':
        main.appendChild(home());
        break;
      case '#login':
        main.appendChild(login());
        break;
      case '#cadastro':
        main.appendChild(cadastro());
        break;
      case '#login-google':
        await signInWithGoogle();
        break;
      case '#login-facebook':
        await signInWithFacebook();
        break;
      case '#feed': {
        main.appendChild(feed());
        break;
      }
      case '#perfil':
        main.appendChild(perfil());
        break;
      case '#editarPerfil':
        main.appendChild(editarPerfil());
        break;
      default:
        main.appendChild(home());
        break;
    }
  };

  window.addEventListener('hashchange', renderPage);
  await renderPage();
};

window.addEventListener('load', async () => {
  const userLoggedIn = checkLoggedUser();
  if (userLoggedIn) {
    window.location.hash = '#feed';
  } else {
    window.location.hash = '#home';
  }

  init();
});

export const navigate = (path) => {
  window.location.hash = path;
};