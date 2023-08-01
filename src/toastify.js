/* eslint-disable no-alert */
import Toastify from 'toastify-js';

// Configurações padrão do Toastify
Toastify.defaults = {
  oldestFirst: true,
  text: 'Toastify is awesome!',
  node: undefined,
  duration: 3000,
  selector: undefined,
  callback() {},
  destination: undefined,
  newWindow: true,
  close: false,
  gravity: 'toastify-top',
  positionLeft: false,
  position: '',
  avatar: '',
  className: '',
  stopOnFocus: true,
  onClick() {},
  offset: { x: 1, y: 0 },
  escapeMarkup: true,
  ariaLive: 'polite',
  style: {
    background: 'white',
    fontSize: '19px', // Tamanho da fonte
    fontWeight: 'bold', // Negrito
  },
};

// Função para exibir uma notificação de sucesso
export const showSuccessNotification = (message) => {
  new Toastify({
    text: message,
    className: 'success',
  }).showToast();
};

// Função para exibir uma notificação de erro
export const showErrorNotification = (message) => {
  new Toastify({
    text: message,
    className: 'error',
  }).showToast();
};

export const showConfirmationDialog = (message, callback) => {
  const result = window.confirm(message);
  if (result) {
    callback();
  }
};
