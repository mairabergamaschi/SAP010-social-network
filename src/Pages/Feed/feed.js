import {
  createPost,
  accessPost,
  updatePost,
  likePost,
  deletePost,
} from '../../firebase/firestore';
import { getUserName, getUserId, logout } from '../../firebase/auth';
import homeicon from '../../images/iconHome.png';
import exiticon from '../../images/iconExit.png';
import likeicon from '../../images/iconLike.png';
import editicon from '../../images/iconEdit.png';
import deleteicon from '../../images/iconDelete.png';

export default () => {
  const container = document.createElement('div');
  const feed = `
  <div class='container'>
    <div class='left-timeline'>

      <p class='postTitle'>Olá ${getUserName()}, bem-vindo(a) de volta!</p>
      <figure class='icones'>
        <button type='button' class='button-timeline' id='home-btn'><img src='${homeicon}' class='icon-timeline' alt='Icone home'></button>
        <button type='button' class='button-timeline' id='logout-btn'><img src='${exiticon}' class='icon-timeline' alt='logout icon'></button>
      </figure>
    </div>
    <div class='right-timeline'>
      <div class='input-container'>
        <textarea class='input-message' id='postArea' placeholder='Compartilhe...'></textarea>
        <button class='shareBtn' id='sharePost'>COMPARTILHAR</button>
      </div>
      <div id='postList'></div>
    </div>
  </div>
  `;

  container.innerHTML = feed;

  const postBtn = container.querySelector('#sharePost');
  const descriptionPost = container.querySelector('#postArea');
  const postList = container.querySelector('#postList');
  const logOutBtn = container.querySelector('#logout-btn');
  const homeBtn = container.querySelector('#home-btn');

  const createPostElement = (
    name,
    description,
    postId,
    authorId,
    whoLiked,
  ) => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `
      <div class='post-container'>
        <div class='nameUser'>
          <p class='userName'>${name}</p>
        </div>
        <p class='textPost'>${description}</p>
          <div class='image-icons'>
            <button type='button' class='icons-post' id='like-Post' data-post-id='${postId}'>
              <a class='icons-post' id='icons-post'><img src='${likeicon}' alt='like image' class='icons-post'></a>
              <span class='likePost' id='likes-counter-${postId}'>${whoLiked.length}</span>
            </button>
            
          ${authorId === getUserId() ? `<button type='button' data-post-id='${postId}' class='icons-post' id='editPost'>
            <a class='icons-post'><img src='${editicon}' alt='edit image' class='icons-post'></a>
          </button>
          <button type='button' class='icons-post' id='btn-delete' data-post-id='${postId}'>
            <img src='${deleteicon}' alt='delete image' class='icons-post'>
          </button>` : ''}
        </div>
      </div>
`;

    return postElement;
  };

  const updateListPost = (TodosPosts) => {
    postList.innerHTML = '';
    TodosPosts.forEach(async (post) => {
      const {
        name, description, id, author, whoLiked,
      } = post;
      const postElement = createPostElement(
        name,
        description,
        id,
        author,
        whoLiked,
      );
      postList.appendChild(postElement);

      const likeButton = postElement.querySelector('#like-Post');
      const postId = likeButton.getAttribute('data-post-id');
      const likesCounter = postElement.querySelector(`#likes-counter-${postId}`);
      likeButton.addEventListener('click', async () => {
        try {
          const likeLike = await likePost(postId, getUserId());
          let currentLikes = parseInt(likesCounter.innerText, 10);
          if (likeLike === 'add like') {
            currentLikes += 1;
          } else {
            currentLikes -= 1;
          }
          likesCounter.innerText = currentLikes;
        } catch (error) {
          console.error('Error ao dar like:', error);
        }
      });
    });
  };

  const loadPosts = async () => {
    await accessPost(updateListPost);
  };

  const handlePostBtnClick = () => {
    const description = descriptionPost.value;

    if (!description) {
      alert('Preencha o campo');
    } else {
      createPost(description)
        .then(() => {
          descriptionPost.value = '';
          alert('Publicação efetuada com sucesso!');
        })
        .catch(() => {
          alert('Ocorreu um erro ao criar o post. Por favor, tente novamente mais tarde');
        });
    }
  };

  const handlePostListClick = (event) => {
    const target = event.target;
    const deleteButton = target.closest('#btn-delete');
    const editButton = target.closest('#editPost');
    if (deleteButton) {
      const postId = deleteButton.getAttribute('data-post-id');
      if (window.confirm('Tem certeza de que deseja excluir a publicação?')) {
        deletePost(postId)
          .then(() => {
            target.closest('.post-container').remove();
            alert('Publicação excluída com sucesso!');
          })
          .catch((error) => {
            alert('Ocorreu um erro ao excluir o post. Por favor, tente novamente mais tarde', error);
          });
      }
    } else if (editButton) {
      const postId = editButton.getAttribute('data-post-id');
      const postElement = editButton.closest('.post-container');
      const textPostElement = postElement.querySelector('.textPost');
      const newText = prompt('Edite a sua postagem:', textPostElement.textContent);
      if (newText && newText.trim() !== '') {
        updatePost(postId, { description: newText })
          .then(() => {
            textPostElement.textContent = newText;
            alert('Post atualizado com sucesso!');
          })
          .catch(() => {
            alert('Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde');
          });
      }
    }
  };

  postBtn.addEventListener('click', handlePostBtnClick);
  postList.addEventListener('click', handlePostListClick);

  homeBtn.addEventListener('click', () => {
    logout() // colocar para ir pro home
      .then(() => {
        window.location.hash = '#home';
      })
      .catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  logOutBtn.addEventListener('click', () => {
    logout()
      .then(() => {
        window.location.hash = '#login';
      })
      .catch(() => {
        alert('Ocorreu um erro, tente novamente.');
      });
  });

  loadPosts();
  return container;
};
