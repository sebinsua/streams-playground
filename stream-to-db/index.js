#!/usr/bin/env node
const streamFromArray = require('stream-from-array');
const createStreamToDatabase = require('./create-stream-to-database');
const { NEO4J_URL, NEO4J_USERNAME, NEO4J_PASSWORD } = require('./config');

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
  statement: `MERGE (p:Person { name: {personName} }) SET p += $props`,
  parameters: { personName, props: { type: 'friends and family', location: 'the world' } }
});

// TODO: Alter the query to be able to add a relationship, too. Makes this generic.
// TODO: Return multiple statements from `toPersonNode` (which should also be renamed.)

const streamToDatabase = createStreamToDatabase(
  { url: NEO4J_URL, username: NEO4J_USERNAME, password: NEO4J_PASSWORD, exitOnCommit: true },
  { person: toPersonNode },
  always('person')
);

streamToDatabase(peopleStream)
