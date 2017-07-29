const actions = require('./actions');
const gdrvAuth = require('./auth');

gdrvAuth(function(auth) {
    actions.listFiles(auth);
})