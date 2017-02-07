#!/usr/bin/env node

const createAmqpStream = require('./create-amqp-stream');
const config = require('./config');

const output = process.stdout;

const logError = console.error.bind(console);

createAmqpStream(config)
  .then(rpc =>
    rpc.pipe(output)
  )
  .catch(logError);
