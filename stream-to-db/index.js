#!/usr/bin/env node
const streamFromArray = require('stream-from-array');
const createStreamToDatabase = require('./create-stream-to-database');
const createNodeStatement = require('./node');
const createRelationshipStatement = require('./relationship');
const { NEO4J_URL, NEO4J_USERNAME, NEO4J_PASSWORD } = require('./config');

const always = value => () => value;

const peopleStream = streamFromArray.obj([
  { name: 'Gilly', loves: 'Seb' },
  { name: 'Seb', loves: 'Gilly' },
  { name: 'Bryony' },
  { name: 'Seth', loves: 'David' },
  { name: 'David', loves: 'Seth' },
  { name: 'Sorrel', loves: 'Jesus' },
  { name: 'Jesus', loves: 'Sorrel' },
  { name: 'Frank', loves: 'Jackie' },
  { name: 'Jackie', loves: 'Frank' },
  { name: 'Ashley', loves: 'Evan' },
  { name: 'Chris', loves: 'Tara' },
  { name: 'Tara', loves: 'Chris' },
  { name: 'Evan', loves: 'Ashley' }
]);

const toPerson = ({ name, loves }) => [
  createNodeStatement({ label: 'Person', props: { name }, idName: 'name' }),
  name && loves ?
    createRelationshipStatement({
      left: { label: 'Person', id: name, idName: 'name' },
      right: { label: 'Person', id: loves, idName: 'name' },
      type: 'LOVES'
    })
  : null
];

const streamToDatabase = createStreamToDatabase(
  { url: NEO4J_URL, username: NEO4J_USERNAME, password: NEO4J_PASSWORD, exitOnCommit: true },
  { person: toPerson },
  always('person')
);

streamToDatabase(peopleStream)
