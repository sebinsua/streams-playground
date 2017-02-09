#!/usr/bin/env node

const debug = require('debug')('to-command-queue:server-test');
const tap = require('tap-stream');

const createAmqpStream = require('./create-amqp-stream');
const config = require('./config');

const toDebugLog = tap(data => debug(data.toString()));
const toErrorLog = console.error.bind(console);

const output = process.stdout;

createAmqpStream(config)
  .then(rpc =>
    rpc
      .pipe(toDebugLog)
      .pipe(output)
  )
  .catch(toErrorLog);
