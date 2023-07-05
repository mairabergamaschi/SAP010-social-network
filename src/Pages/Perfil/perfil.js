export default () => {
  const container = document.createElement('div');

  const profileSection = `
    <section class="user-profile">
      <div class="profile-header">
        <img src="user-avatar.jpg" alt="Nome do Usuário"></img>
        <h2>Nome do Usuário</h2>
      </div>
      <div class="profile-content">
        <h3>Últimas Publicações</h3>
        <div class="post">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus sem non dapibus facilisis.</p>
        </div>
      </div>
      <div class="profile-actions">
        <a href="#editarPerfil">Editar Perfil</a>
      </div>
    </section>
  `;

  container.innerHTML = profileSection;

  return container;
};
