const snakeize = require('snakeize');

const getFormatedColumnNames = (object) => Object.keys(snakeize(object)).join(', ');

const getFormatedQuantityValues = (object) => Object.keys(object).map(() => '?').join(', ');

const getFormatedUpdate = (object) => Object.keys(snakeize(object))
  .map((key) => `${key} = ?`).join(', ');

module.exports = {
  getFormatedColumnNames,
  getFormatedQuantityValues,
  getFormatedUpdate,
};