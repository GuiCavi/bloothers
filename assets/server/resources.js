const Hemocenters = require('./hemo.json');

const hemocenter = (verb = 'GET') => {
  return new Promise((res, rej) => {
    switch (verb) {
      case 'GET':
      default:
        res(Hemocenters['hemo']);
    }
  });
};

export default {
  hemocenter,
};
