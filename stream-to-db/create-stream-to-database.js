const debug = require('debug')('stream-to-db');
const cypherStream = require('cypher-stream');
const tap = require('tap-stream');

const createToStatement = require('./create-to-statement');

const toDebugLog = tap(data => debug(data));

const onCommitted = exitOnCommit => () => {
  debug('committed')
  if (exitOnCommit === true) {
    debug('exiting');
    process.exit(0);
  }
};
const toCommit = transaction => () => {
  debug('committing');
  transaction.commit();
};

function createStreamToDatabase ({ url, username, password, exitOnCommit }, generateStatements, toType) {
  return stream => {
    const cs = cypherStream(url, username, password);

    const transaction = cs.transaction();
    transaction.on('comitted', onCommitted(exitOnCommit));
    stream.on('end', toCommit(transaction));

    const toStatement = createToStatement(generateStatements, toType);
    return stream
      .pipe(toStatement)
      .pipe(toDebugLog)
      .pipe(transaction);
  };
}

module.exports = createStreamToDatabase;
