#!/usr/bin/env node

const toCommands = require('./to-commands');
const { stringify } = require('JSONStream');

const createAmqpStream = require('./create-amqp-stream');
const config = require('./config');

const input = process.stdin;
input.on('end', () => process.exit(0));

const logError = console.error.bind(console);

createAmqpStream(config)
  .then(rpc =>
    toCommands(input)
      .pipe(stringify(false))
      .pipe(rpc)
  )
  .catch(logError);
