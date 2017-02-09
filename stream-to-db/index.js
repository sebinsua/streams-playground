#!/usr/bin/env node
const streamFromArray = require('stream-from-array');
const createStreamToDatabase = require('./create-stream-to-database');
const config = require('./config');

const always = value => () => value;

const peopleStream = streamFromArray.obj([
  'Gilly',
  'Seb',
  'Bryony',
  'Seth',
  'Sorrel',
  'Jesus',
  'Frank',
  'Jackie',
  'Ashley',
  'Chris',
  'Tara',
  'Evan'
]);

const toPersonNode = personName => ({
  statement: 'MERGE (p:Person { name: {personName} })',
  parameters: { personName }
});

// TODO: disable toExit.
// TODO: add a _context/_command to the to-command-queue.
// TODO: Alter the query to be able to add properties to a pre-existing Node. Make this generic.
// TODO: Alter the query to be able to add a relationship, too. Makes this generic.
// TODO: Return multiple statements from `toPersonNode` (which should also be renamed.)

const streamToDatabase = createStreamToDatabase(config, { person: toPersonNode }, always('person'));

streamToDatabase(peopleStream)
