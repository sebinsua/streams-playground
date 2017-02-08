#!/usr/bin/env node
const toErrorLog = console.error.bind(console);

const DEFAULT_WAIT_BEFORE_CLOSE = 5000;
const DEFAULT_EXCHANGE_OPTIONS = { type: 'topic', durable: false, autoDelete: true };

const createWaitBeforeClosing = (timeout = DEFAULT_WAIT_BEFORE_CLOSE) =>
  connection =>
    setTimeout(() => connection.close(), timeout);

const waitBeforeClosing = createWaitBeforeClosing();

const toBufferMessage = message => Buffer.from(typeof message === 'string' ? message : JSON.stringify(message));

function createPublish (open, exchange, routerKey, exchangeOptions = DEFAULT_EXCHANGE_OPTIONS) {
  return message =>
    open
      .then(connection =>
        connection
          .createChannel()
            .then(channel =>
              channel.assertExchange(exchange, exchangeOptions.type, exchangeOptions)
                .then(() => channel.publish(exchange, routerKey, toBufferMessage(message)))
            )
            .then(() => connection)
      )
      .catch(toErrorLog);
}

module.exports = createPublish;
module.exports.createPublish = createPublish;
module.exports.waitBeforeClosing = waitBeforeClosing;
