export default () => {
  const container = document.createElement('div');

  const editarPerfil = `
    <section class="user-profile">
      <div class="profile-header">
        <img src="user-avatar.jpg" alt="Nome do Usuário"></img>
        <h2>Nome do Usuário</h2>
      </div>
      <div class="profile-content">
        <h3>Editar Perfil</h3>
        <form>
          <div>
            <label for="fullname">Nome Completo:</label>
            <input type="text" id="fullname" name="fullname"></input>
          </div>
          <div>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email"></input>
          </div>
          <div>
            <label for="phone">Telefone:</label>
            <input type="tel" id="phone" name="phone"></input>
          </div>
          <div>
            <label for="birthdate">Data de Nascimento:</label>
            <input type="date" id="birthdate" name="birthdate"></input>
          </div>
          <div>
            <label for="notifications">Notificações:</label>
            <select id="notifications" name="notifications">
              <option value="enabled">Ativadas</option>
              <option value="disabled">Desativadas</option>
            </select>
          </div>
          <div>
            <label for="security">Segurança:</label>
            <input type="password" id="security" name="security"></input>
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
        <button class="logout-button">Sair</button>
      </div>
    </section>
  `;

  container.innerHTML = editarPerfil;

  return container;
};
