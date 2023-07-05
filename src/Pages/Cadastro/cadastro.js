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
        <a href="#" class="google-login">Google</a>
        <a href="#" class="facebook-login">Facebook</a>
      </div>
    </section>
  `;

  container.innerHTML = cadastro;

  return container;
};
