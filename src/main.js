import home from './Pages/Home/home.js';
import login from './Pages/Login/login.js';
import cadastro from './Pages/Cadastro/cadastro.js';
import feed from './Pages/Feed/feed.js';
import perfil from './Pages/Perfil/perfil.js';
import editarPerfil from './Pages/Editar/editar.js';
import { signInWithGoogle, signInWithFacebook, checkLoggedUser } from './firebase/auth.js';

const main = document.querySelector('#root');
const init = async () => {
  window.addEventListener('hashchange', async () => {
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
        const userLoggedIn = await checkLoggedUser();
        if (userLoggedIn) {
          main.appendChild(feed());
        } else {
          // eslint-disable-next-line no-alert
          alert('realize o login');
          main.appendChild(login());
        }
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
  });
};

window.addEventListener('load', async () => {
  const userLoggedIn = await checkLoggedUser();
  if (userLoggedIn) {
    main.appendChild(feed());
  } else {
    window.location.hash = '#home';
    main.appendChild(home());
  }
  init();
});

export const navigate = (hash) => {
  window.location.hash = hash;
};
