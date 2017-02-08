const through2 = require('through2');
const tokenizer = require('sbd');

const toSentences = through2.obj(function (line, encoding, callback) {
  const sentences = tokenizer.sentences(line, { newline_boundaries: true });
  sentences.forEach(sentence => this.push(sentence));
  callback();
});

module.exports = toSentences;
