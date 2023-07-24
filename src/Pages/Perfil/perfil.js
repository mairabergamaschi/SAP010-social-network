/* eslint-disable no-alert */
import { getUserName, logout } from '../../firebase/auth.js';
import profileicon from '../../images/photoicon.png';
import returnIcon from '../../images/arrow.png';
import logoutIcon from '../../images/iconExit.png';

export default () => {
  const profile = document.createElement('div');
  const name = getUserName();
  const profileSection = `
    <section class="user-profile">
      <div class="profile-header">
        <img src='${profileicon}' class='profile' alt="Foto do Usuário"></img>
        <h2>${name}</h2>
        <a href="#editarPerfil">Editar Perfil</a>
      </div>
      <div class="profile-actions">
      <button class="return-btn"><img src="${returnIcon}" alt="Ícone de retorno"></button>
      <button class="logout-btn"><img src="${logoutIcon}" alt="Ícone de logout"></button>
      </div>
      <div class="profile-content">
        <h3>Últimas Publicações</h3>
        <div class="post-list"></div>
      </div>
    </section>
  `;

  profile.innerHTML = profileSection;

  const handleReturnToFeedClick = () => {
    window.location.hash = '#timeline';
  };

  const handleLogoutClick = () => {
    logout()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  };

  const returnToFeedBtn = profile.querySelector('.return-btn');
  const logoutBtn = profile.querySelector('.logout-btn');

  returnToFeedBtn.addEventListener('click', handleReturnToFeedClick);
  logoutBtn.addEventListener('click', handleLogoutClick);

  return profile;
};
