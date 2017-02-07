const debug = require('debug')('amqp-stream');

const amqp = require('amqp');
const promisify = require('any-promisify');
const amqpStream = promisify(require('amqp-stream'));

module.exports = ({
  AMQP_URL,
  AMQP_EXCHANGE,
  AMQP_ROUTER_KEY
}) => {
  const connection = amqp.createConnection(AMQP_URL);
  connection.on('ready', () => debug('amqp ready'));
  return amqpStream({ connection, exchange: AMQP_EXCHANGE, routingKey: AMQP_ROUTER_KEY });
}
