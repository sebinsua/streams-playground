#!/usr/bin/env node

const { connect } = require('amqplib');
const { createPublish, waitBeforeClosing } = require('./publish');

const { AMQP_URL, AMQP_EXCHANGE, AMQP_ROUTER_KEY } = require('./config');

const open = connect(AMQP_URL);
const publish = createPublish(open, AMQP_EXCHANGE, AMQP_ROUTER_KEY);

publish('Hey there!')
  .then(waitBeforeClosing);
