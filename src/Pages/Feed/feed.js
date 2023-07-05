export default () => {
  const container = document.createElement('div');

  const feed = `
    <section class="search-box">
      <input type="text" id="search-input" placeholder="Pesquisar por destino ou palavra-chave">
      <button id="search-button">Buscar</button>
    </section>

    <section class="post-box">
      <h2>Postagens Recentes</h2>
      <form id="post" name="post">
        <textarea id="post-text" name="post-text" placeholder="Digite sua postagem..."></textarea>
        <button type="submit">Postar</button>
      </form>
    </section>

    <section class="timeline">
      <h2>Timeline</h2>
      <div id="posts-container"></div>
    </section>
  `;

  container.innerHTML = feed;

  // Função para renderizar os posts na timeline
  const renderPosts = (posts) => {
    const postsContainer = document.getElementById('posts-container');

    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <div class="post-header">
          <img src="${post.userProfilePhoto}" alt="${post.userName}">
          <h3>${post.userName}</h3>
        </div>
        <div class="post-content">
          <p>${post.content}</p>
        </div>
        <div class="post-actions">
          <button class="like-button">Curtir</button>
          <button class="comment-button">Comentar</button>
        </div>
      `;

      postsContainer.appendChild(postElement);
    });
  };

  // Exemplo de posts para teste
  const posts = [
    {
      userName: 'Nome do Usuário 1',
      userProfilePhoto: 'user-avatar-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus sem non dapibus facilisis.',
    },
    {
      userName: 'Nome do Usuário 2',
      userProfilePhoto: 'user-avatar-2.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus sem non dapibus facilisis.',
    },
  ];

  renderPosts(posts);

  return container;
};
