#!/usr/bin/env node

const debug = require('debug')('to-command-queue:server');
const map = require('through2-map');
const tap = require('tap-stream');

const createAmqpStream = require('./create-amqp-stream');
const emitFromStream = require('./emit-from-stream');
const streams = require('./streams');
const config = require('./config');

const parse = map.obj(s => JSON.parse(s));

const toDebugLog = tap(data => debug(data));
const toErrorLog = console.error.bind(console);

const output = process.stdout;

// TODO: The command should fire a twitter stream which should then pipe to neo4j using codex-digital/cypher-stream
// See: https://github.com/codex-digital/cypher-stream

createAmqpStream(config)
  .then(rpc =>
    rpc
      .pipe(parse)
      .pipe(emitFromStream(streams))
      .pipe(toDebugLog)
      // .pipe(output)
  )
  .catch(toErrorLog);
