import profileicon from '../../images/photoicon.png';
import background from '../../images/iconcapa.png';

export default () => {
  const container = document.createElement('div');

  const editarPerfil = `
    <section class="user-profile">
      <div class="profile-header">
        <img src='${profileicon}' class="profile" alt="Foto do Usuário"></img>
        <span class="photo"><i class="fas fa-pencil-alt edit-icon"></i></span>
        </div>
        <div>
        <button class="capa">Foto de capa</button>
        <span><img src='${background}' class="image"></img></span>
      </div>
      <div class="profile-edit">
        <h3 class="editar-perfil">Editar Perfil</h3>
      <div>
      <label class="perfil" for="fullname">Nome Completo:</label>
      <input type="text" class="boxes" id="fullname"></input><i class="fas fa-pencil-alt edit-icon"></i>
      </div>
      <div class="bio">
      <label class="perfil" for="biography">Biografia:</label>
      <textarea id="biography" name="biography"></textarea><i class="fas fa-pencil-alt edit-icon"></i>
        <form>
          <div class="security">
        <div class="info">
        <label class="segurança">Informações:</label><i class="fas fa-pencil-alt edit-icon"></i>
            <label class="perfil1" for="email">E-mail: email@example.com</label>
            <br>
            <label class="perfil1" for="phone">Telefone: (81) 99765-8934 </label>
            <br>
            <label class="perfil1" for="birthdate">Data de Nascimento:</label>
            <input type="date" id="birthdate"></input>
            <br>
            <label class="segurança">Personalização:</label>
            <br>
            <label class="perfil" for="notifications">Notificações</label>
            <select id="notifications" name="notifications">
              <option value="enabled">Ativadas</option>
              <option value="disabled">Desativadas</option>
            </select>
          </div>
          <button class="save">Salvar Alterações</button>
        </form>
        <button class="logout-button">Sair</button>
      </div>
    </section>
  `;

  container.innerHTML = editarPerfil;

  return container;
};
