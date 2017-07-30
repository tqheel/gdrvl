'use strict';
const google = require('googleapis');
const auth = require('./auth');
const fs = require('fs');
const service = google.drive(
  {
    version: 'v3'
  });
/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  service.files.list({
    auth: auth,
    pageSize: 10,
    fields: "nextPageToken, files(id, name)"
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var files = response.files;
    if (files.length == 0) {
      console.log('No files found.');
    } else {
      console.log('Files:');
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        console.log('%s (%s)', file.name, file.id);
      }
    }
  });
}

function addFile(auth, fileMetaData, media) {

  console.log('drive initiated, adding file')
  service.files.create({
    auth: auth,
    resource: fileMetaData,
    media: media,
    fields: 'id'
    
  }, function (err, file) {
    console.log('this is the callback')
    if (err) {
      throw err;
    } else {
      console.log('FileId: ', file.id);
    }

  });
}

function addFiles(fileArray) {

}

module.exports = {
  listFiles: listFiles,
  addFile: addFile
}