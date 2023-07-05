import { getFirestore, collection, addDoc, updateDoc, doc, deleteDoc, getDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { app } from './firebase.js';

const db = getFirestore(app);

// Função para adicionar um novo usuário ao banco de dados
const addUser = async (user) => {
  try {
    // Crie um documento para o novo usuário na coleção "usuarios"
    await addDoc(collection(db, "usuarios"), user);
    console.log("Usuário adicionado ao banco de dados:", user);
  } catch (error) {
    console.log("Erro ao adicionar usuário ao banco de dados:", error);
  }
};

// Após o cadastro do usuário
const user = {
  nome: "Nome do usuário",
  email: "email@example.com",
  // Outras informações do usuário
};

// Chame a função para adicionar o usuário ao banco de dados
addUser(user);

// Função para criar um novo post
export const createPost = async (userId, content) => {
  try {
    const post = {
      userId,
      content,
      likes: 0,
      comments: [],
      timestamp: new Date().getTime(),
    };

    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Novo post criado com ID:', docRef.id);
  } catch (error) {
    console.log('Erro ao criar o post:', error);
  }
};

// Função para adicionar um comentário a um post
export const addComment = async (postId, userId, comment) => {
  try {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const post = postSnap.data();
      post.comments.push({ userId, comment });

      await updateDoc(postRef, { comments: post.comments });
      console.log('Comentário adicionado com sucesso');
    } else {
      console.log('O post não existe');
    }
  } catch (error) {
    console.log('Erro ao adicionar comentário:', error);
  }
};

// Adicionar uma curtida a um post
export const addLike = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  const likesRef = collection(postRef, 'likes');
  
  // Verifica se o usuário já curtiu o post antes de adicionar uma nova curtida
  const likeQuery = await getDocs(likesRef.where('userId', '==', userId));
  if (likeQuery.empty) {
    // Adiciona uma nova curtida ao post
    await addDoc(likesRef, {
      userId: userId,
      createdAt: new Date(),
    });

    // Atualiza o contador de curtidas no post
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const likesCount = postDoc.data().likesCount || 0;
      await updateDoc(postRef, {
        likesCount: likesCount + 1,
      });
    }
  }
};

// Remover uma curtida de um post
export const removeLike = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  const likesRef = collection(postRef, 'likes');
  
  // Verifica se o usuário já curtiu o post antes de remover a curtida
  const likeQuery = await getDocs(likesRef.where('userId', '==', userId));
  if (!likeQuery.empty) {
    const likeDoc = likeQuery.docs[0];
    
    // Remove o documento de curtida
    await deleteDoc(likeDoc.ref);

    // Atualiza o contador de curtidas no post
    const postDoc = await getDoc(postRef);
    if (postDoc.exists()) {
      const likesCount = postDoc.data().likesCount || 0;
      await updateDoc(postRef, {
        likesCount: likesCount - 1,
      });
    }
  }
};

// Verificar se um usuário curtiu um post específico
export const hasLikedPost = async (postId, userId) => {
  const postRef = doc(db, 'posts', postId);
  const likesRef = collection(postRef, 'likes');
  
  const likeQuery = await getDocs(likesRef.where('userId', '==', userId));
  return !likeQuery.empty;
};

// Função para deletar um post
export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
    console.log('Post deletado com sucesso');
  } catch (error) {
    console.log('Erro ao deletar o post:', error);
  }
};

// Função para editar o conteúdo de um post
export const editPost = async (postId, newContent) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { content: newContent });
    console.log('Post editado com sucesso');
  } catch (error) {
    console.log('Erro ao editar o post:', error);
  }
};

// Função para obter os posts mais recentes
export const getPosts = async () => {
  const postsRef = collection(db, 'posts');

  // Obtém todos os posts ordenados por data de criação (do mais recente para o mais antigo)
  const q = query(postsRef, orderBy('createdAt', 'desc'));

  // Obtém os documentos dos posts
  const querySnapshot = await getDoc(q);
  const posts = [];
  for (const doc of querySnapshot.docs) {
    const post = doc.data();

    // Obtém os detalhes do usuário
    const userSnapshot = await doc.ref.parent.parent.get();
    const user = userSnapshot.data();

    // Adiciona os detalhes do usuário ao post
    post.userId = user.userId;
    post.userName = user.name;
    post.userProfilePhoto = user.profilePhoto;

    posts.push(post);
  }

  return posts;
};
