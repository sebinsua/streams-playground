#!/usr/bin/env node
const split = require('split');
const filter = require('through2-filter');
const map = require('through2-map');
const toSentences = require('./to-sentences');
const sentiment = require('sentiment');

const toLine = split();
const isNonEmptyLine = filter.obj(line => line.length > 0);
const toSentiment = map.obj(sentence => `${JSON.stringify({ sentence, sentiment: sentiment(sentence) })}\n`);

process.stdin
  .pipe(toLine)
  .pipe(isNonEmptyLine)
  .pipe(toSentences)
  .pipe(toSentiment)
  .pipe(process.stdout)
