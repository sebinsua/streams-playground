const map = require('through2-map');

const prop = propName => (obj = {}) => obj[propName];

const createToStatement = (generateStatements, toType = prop('type')) => map.obj(v => {
  const type = toType(v);
  const generateStatement = generateStatements[type];
  return generateStatement(v);
});

module.exports = createToStatement;
