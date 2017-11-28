'use strict';

module.exports = function(Gileadform) {
  Gileadform.printToPdf = function(id, cb) {
    // Get the form from the database

    // Use the pdf module to create a Gilead pdf based on the fields
    var pdfFormFill = require('pdf-fill-form');
    var fs = require('fs');

    // Show fields
    var formFields = pdfFormFill.readSync('template/gilead.pdf');
    console.log(formFields);

    // Write fields
    pdfFormFill.writeAsync('template/gilead.pdf',
      {'Benefits Investigation': true, 'Product Name': 'PreP'},
      {'save': 'imgpdf'}, function(err, result) {
      if (err) {
        return console.log(err);
      }

      fs.writeFile('./out/test_filled_images.pdf', result, function(err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
        cb(null, 'The file was saved! ' + id);
      });
    });


  }

  Gileadform.remoteMethod('printToPdf', {
    accepts: {arg: 'id', type: 'number'},
    returns: {arg: 'url', type: 'string'},
    http: {path: '/:id/print', verb: 'get'},
  });
};
