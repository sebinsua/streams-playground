#!/usr/bin/env node

const toCommands = require('./to-commands');
const { stringify } = require('JSONStream');
const debug = require('debug')('to-command-queue:client');
const tap = require('tap-stream');

const createAmqpStream = require('./create-amqp-stream');
const config = require('./config');

const toDebugLog = tap(data => debug(data));
const toErrorLog = console.error.bind(console);

const input = process.stdin;
input.on('end', () => process.exit(0));

createAmqpStream(config)
  .then(rpc =>
    toCommands(input)
      .pipe(toDebugLog)
      .pipe(stringify(false))
      .pipe(rpc)
  )
  .catch(toErrorLog);
