const NEO4J_URL = process.env.NEO4j_URL || 'bolt://localhost';
const NEO4J_USERNAME = process.env.NEO4J_USERNAME || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'neo4j-password';

module.exports = {
  NEO4J_URL,
  NEO4J_USERNAME,
  NEO4J_PASSWORD
};
