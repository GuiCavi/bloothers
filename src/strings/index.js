const langs = {
  'pt-br': require('./pt-br'),
};

const selectString = lang => langs[lang];

module.exports = selectString;
