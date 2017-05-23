const restify = require('restify');
const builder = require('botbuilder');
const logger = require('logger').createLogger();

// Setup restify server
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  logger.info(`${server.name} started and listening on ${server.url}`);
});

// Creating a chat connector for communicating with the bot framework service
const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

//Receive each message and relay it back to the user.
const bot = new builder.UniversalBot(connector, (session) => {
  session.send(`You send: ${session.message.text}`);
});
