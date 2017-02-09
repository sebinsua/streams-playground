const debug = require('debug')('stream-to-db');
const cypherStream = require('cypher-stream');
const tap = require('tap-stream');

const createToStatement = require('./create-to-statement');

const toDebugLog = tap(data => debug(data));

const toExit = () => {
  debug('exiting');
  process.exit(0);
};
const toCommit = transaction => () => {
  debug('committing');
  transaction.commit();
};

function createStreamToDatabase ({ NEO4J_URL, NEO4J_USERNAME, NEO4J_PASSWORD }, generateStatements, toType) {
  return stream => {
    const cs = cypherStream(NEO4J_URL, NEO4J_USERNAME, NEO4J_PASSWORD);

    const transaction = cs.transaction();
    transaction.on('comitted', toExit);
    stream.on('end', toCommit(transaction));

    const toStatement = createToStatement(generateStatements, toType)
    return stream
      .pipe(toStatement)
      .pipe(toDebugLog)
      .pipe(transaction);
  };
}

module.exports = createStreamToDatabase;
