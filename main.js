const gDriveActions = require('./gDriveActions');
const gdrvAuth = require('./auth');
const fs = require('fs');

gdrvAuth(function (auth) {
    let fileName = '2017731223341.zip';
    let filePath = 'C:\\backup_for_archive\\'  + fileName;
    let size = fs.lstatSync(filePath).size;
    let bytes = 0;    
    let folderId = '0B2VFCwp6zaaTOVNiMWszalJPU3c'; // data_archive/src
    console.log("Starting upload of file path "+ filePath);
    gDriveActions.addFile(
        auth,
        {
            "name": fileName,
            "parents": [ "0B2VFCwp6zaaTOVNiMWszalJPU3c" ] 
        },
        {
            mimeType: "application/octet-stream",
            body: fs.createReadStream(filePath)
            .on('data', (chunk) => {
                console.log(bytes += chunk.length, size, `${((bytes += chunk.length)/size)*100}%`)
                }       
            )       

    //gDriveActions.listFiles(auth);
    });

});

