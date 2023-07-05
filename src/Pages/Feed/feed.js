import { getPosts, createPost, addComment, addLike, removeLike, hasLikedPost, deletePost, editPost } from '../../firebase/firestore.js';
import { checkLoggedUser, logout } from '../../firebase/auth.js';
import { navigate } from '../../main.js';

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

    <button id="logout-button">Logout</button>
  `;

  container.innerHTML = feed;

  const postsContainer = container.querySelector('#posts-container');

  const renderPosts = async () => {
    postsContainer.innerHTML = '';

    const posts = await getPosts();
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
          ${userLoggedIn && post.userId === userLoggedIn.userId ? `
            <button class="delete-button">Excluir</button>
            <button class="edit-button">Editar</button>
          ` : ''}
        </div>
      `;

      const likeButton = postElement.querySelector('.like-button');

      // Verifique se o usuário logado já curtiu o post
      const userLoggedIn = checkLoggedUser();
      if (userLoggedIn && hasLikedPost(post.postId, userLoggedIn.uid)) {
        likeButton.classList.add('liked');
        likeButton.textContent = 'Remover Curtida';
      }

      likeButton.addEventListener('click', async () => {
        if (userLoggedIn) {
          if (likeButton.classList.contains('liked')) {
            // Se o usuário já curtiu o post, remova a curtida
            await removeLike(post.postId, userLoggedIn.uid);
            likeButton.classList.remove('liked');
            likeButton.textContent = 'Curtir';
          } else {
            // Se o usuário ainda não curtiu o post, adicione a curtida
            await addLike(post.postId, userLoggedIn.uid);
            likeButton.classList.add('liked');
            likeButton.textContent = 'Remover Curtida';
          }
        } else {
          alert('Realize o login para curtir um post.');
          navigate('#login');
        }
      });

      const commentButton = postElement.querySelector('.comment-button');
      commentButton.addEventListener('click', () => {
        const commentText = prompt('Digite seu comentário:');
        if (commentText) {
          addComment(post.postId, userLoggedIn.userId, commentText)
            .then(() => {
              alert('Comentário adicionado com sucesso');
              renderPosts();
            })
            .catch((error) => {
              console.log('Erro ao adicionar comentário:', error);
              alert('Erro ao adicionar comentário. Tente novamente mais tarde.');
            });
        }
      });

      const deleteButton = postElement.querySelector('.delete-button');
      if (deleteButton) {
        deleteButton.addEventListener('click', () => {
          if (confirm('Tem certeza de que deseja excluir este post?')) {
            deletePost(post.postId)
              .then(() => {
                alert('Post excluído com sucesso');
                renderPosts();
              })
              .catch((error) => {
                console.log('Erro ao excluir o post:', error);
                alert('Erro ao excluir o post. Tente novamente mais tarde.');
              });
          }
        });
      }

      const editButton = postElement.querySelector('.edit-button');
      if (editButton) {
        editButton.addEventListener('click', () => {
          const newContent = prompt('Digite o novo conteúdo do post:', post.content);
          if (newContent) {
            editPost(post.postId, newContent)
              .then(() => {
                alert('Post editado com sucesso');
                renderPosts();
              })
              .catch((error) => {
                console.log('Erro ao editar o post:', error);
                alert('Erro ao editar o post. Tente novamente mais tarde.');
              });
          }
        });
      }

      postsContainer.appendChild(postElement);
    });
  };

  renderPosts();

  const postForm = container.querySelector('#post');
  const userLoggedIn = checkLoggedUser();
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const postText = postForm.querySelector('#post-text').value;
    if (postText) {
      createPost(userLoggedIn.userId, postText)
        .then(() => {
          alert('Post criado com sucesso');
          postForm.reset();
          renderPosts();
        })
        .catch((error) => {
          console.log('Erro ao criar o post:', error);
          alert('Erro ao criar o post. Tente novamente mais tarde.');
        });
    }
  });

  const logoutButton = container.querySelector('#logout-button');
logoutButton.addEventListener('click', () => {
  logout();
  navigate('');
});



  return container;
};

