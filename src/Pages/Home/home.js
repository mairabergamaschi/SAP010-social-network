const home = () => {
  const content = document.createElement('div');

  const homeSection = document.createElement('section');
  homeSection.classList.add('hero');

  const backgroundImage = document.createElement('img');
  backgroundImage.src = 'caminho-da-imagem-de-fundo'; // Insira o caminho da imagem de fundo desejada
  backgroundImage.alt = 'background';

  const logoImage = document.createElement('img');
  logoImage.src = 'caminho-do-logo'; // Insira o caminho do logo desejado
  logoImage.alt = 'logo';

  const description = document.createElement('p');
  description.textContent = 'Bem-vinda ao Ladies on the Go, a rede social dedicada a mulheres que viajam sozinhas ou em grupos de mulheres! Planeje suas aventuras, encontre companheiras de viagem, descubra destinos emocionantes e compartilhe suas próprias experiências.';

  const loginButton = document.createElement('button');
  loginButton.id = 'loginButton';
  loginButton.textContent = 'Login';

  loginButton.addEventListener('click', () => {
    window.location.hash = '#login';
  });

  const registerButton = document.createElement('button');
  registerButton.id = 'registerButton';
  registerButton.textContent = 'Cadastro';

  registerButton.addEventListener('click', () => {
    window.location.hash = '#cadastro';
  });

  homeSection.appendChild(backgroundImage);
  homeSection.appendChild(logoImage);
  homeSection.appendChild(description);
  homeSection.appendChild(loginButton);
  homeSection.appendChild(registerButton);

  content.appendChild(homeSection);

  return content;
};

export default home;
