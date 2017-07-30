const gDriveActions = require('./gDriveActions');
const gdrvAuth = require('./auth');
const fs = require('fs');
gdrvAuth(function (auth) {
    gDriveActions.addFile(
        auth,
        {
            "name": "test.txt"
        },
        {
            mimeType: "text/plain",
            body: fs.createReadStream('./test.txt')
        }
    );

    gDriveActions.listFiles(auth);
});



