const map = require('through2-map');

const prop = propName => (obj = {}) => obj[propName];
const isTruthy = v => !!v;
const cleanWhitespace = v =>
  Object.assign({}, v, { statement: typeof v.statement === 'string' ? v.statement.trim().replace(/\s\s+/g, ' ') : '' });

const createToStatement = (generateStatements, toType = prop('type')) => map.obj(v => {
  const type = toType(v);
  const generateStatement = generateStatements[type];
  const statements = generateStatement(v);
  return Array.isArray(statements) ? statements.filter(isTruthy).map(cleanWhitespace) : cleanWhitespace(statements);
});

module.exports = createToStatement;
