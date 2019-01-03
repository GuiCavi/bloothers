const hemocenter = {
  get: () => {
    return fetch('https://bloothers-server.herokuapp.com/hemo');
  },
};

const donator = {
  get: (cpf = '') => {
    let url = 'https://bloothers-server.herokuapp.com/doadores';

    if (cpf !== '') {
      url += '?cpf=' + cpf;
    }
    return fetch(url);
  },
};

export default {
  hemocenter,
  donator,
};
