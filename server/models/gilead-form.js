'use strict';
var async = require('async');

module.exports = function(Gileadform) {
  Gileadform.printToPdf = function(id, cb) {

    async.waterfall([
        function GetFormFromDB(getFormCB){
              var filter = {
                id: id
              }

              // Get the form from the database
              Gileadform.findById(id, function(err, formModel) {

                if(err)
                  getFormCB(err);
                else
                  getFormCB(null, formModel);
              });

          },
        function TransformFormValues(model, transformCB){
          // Use the values from the model to create an object with field/value pairs
          // that can be used to populate the pdfFormFill
          console.log(model.display_name);
          var services = model.services;

          var result =
            {
              'Benefits Investigation' : model.services,
              'Prior Authorization and Appeals Information' : model.services,
              'PAP Eligibility Screening' : model.services,
              'Co-pay Coupon Program Enrollment' : model.services,
              'Independent Co-pay Foundation Information' : model.services,
              'Product Name' : model.product_name,
               'mg': model.product_name_mg,
              'Treatment': model.program_purpose,
              'PrEP' : model.program_purpose,
              'Patient Name' : model.display_name,
              'Patient Address' : model.patient_address,
              'Patient City' : model.patient_city,
              'Patient State' : model.patient_state,
              'Zip Code' : model.patient_zipcode,
              'Patient Phone' : model.patient_phone,
              'Last 4 SSN' : model.ssn,
              'Patient DOB' : model.birth_date,
              'Alternate Contact Name': model.alternate_contact_name,
              'Alt Contact Phone #': model.alternate_contact_phone,
              //'Relationship': model.alternate_contact_relationship
              'Primary Insurance' : model.primary_insurance,
              'Plan name' : model.plan_name,
              'Payer Phone Number' : model.payer_phone_number,
              'Subscriber Name' : model.subscriber_name,
              'Policy Holder Name' : model.policy_holder_name,
              'Policy Holder Relationship' : model.policy_holder_relationship,
              'Policy #' : model.policy_number,
              'Group #' : model.group_number,
              'Rx Bin #' : model.rx_bin_number,
              'Rx PCN#' : model.rx_pcn_number,
              'secondary insurance' : model.secondary_insurance,
              'Prescriber Name' : model.prescriber_name,
              'Facility Name' : model.prescriber_facility_name,
              'Prescriber Address' : model.prescriber_address,
              'Prescriber City' : model.prescriber_city,
              'Prescriber State' : model.prescriber_state,
              'Prescriber Zip Code' : model.prescriber_zipcode,
              'Office Contact' : model.office_contact,
              'Prescriber Phone #' : model.prescriber_phone_number,
              'Prescriber Fax #' : model.prescriber_fax_number,
              'Prescriber NPI#' : model.prescriber_npi_number,
              'Prescriber Tax ID #' : model.prescriber_tax_id_number,
              'Prescriber State License #' : model.prescriber_state_license_number,
              'Diagnosis' : model.diagnosis,
              196608 : model.display_name

            }

          var fields = [

            { name: 'Office Contact',
              page: 1,
              value: '',
              id: 131117,
              type: 'text' },
            { name: 'Prescriber Phone #',
              page: 1,
              value: '',
              id: 131118,
              type: 'text' },
            { name: 'Prescriber Fax #',
              page: 1,
              value: '',
              id: 131119,
              type: 'text' },
            { name: 'Prescriber NPI#',
              page: 1,
              value: '',
              id: 131120,
              type: 'text' },
            { name: 'Prescriber Tax ID #',
              page: 1,
              value: '',
              id: 131121,
              type: 'text' },
            { name: 'Prescriber State License  #',
              page: 1,
              value: '',
              id: 131122,
              type: 'text' },
            { name: 'Diagnosis', page: 1, value: '', id: 131123, type: 'text' },
            { name: 'Group87',
              page: 1,
              value: undefined,
              id: 131124,
              type: 'radio' },
            { name: 'Group94',
              page: 1,
              value: undefined,
              id: 131125,
              type: 'radio' },
            { name: 'Patient Name',
              page: 2,
              value: '',
              id: 196608,
              type: 'text' },
            { name: 'Patient DOB',
              page: 2,
              value: '',
              id: 196609,
              type: 'text' },
            { name: 'Check Box59',
              page: 2,
              value: false,
              id: 196610,
              type: 'checkbox' },
            { name: 'Patient Rep\'s Name',
              page: 2,
              value: '',
              id: 196611,
              type: 'text' },
            { name: 'Patient Rep\'s Relationship to Patient',
              page: 2,
              value: '',
              id: 196612,
              type: 'text' },
            { name: 'Patient Name',
              page: 3,
              value: '',
              id: 262144,
              type: 'text' },
            { name: 'Patient DOB',
              page: 3,
              value: '',
              id: 262145,
              type: 'text' },
            { name: 'Current Annual Household Income',
              page: 3,
              value: '',
              id: 262146,
              type: 'text' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262147,
              type: 'radio' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262148,
              type: 'radio' },
            { name: 'Other Specify',
              page: 3,
              value: '',
              id: 262149,
              type: 'text' },
            { name: 'SSN', page: 3, value: '', id: 262150, type: 'text' },
            { name: 'Group98',
              page: 3,
              value: undefined,
              id: 262151,
              type: 'radio' },
            { name: 'Group98',
              page: 3,
              value: undefined,
              id: 262152,
              type: 'radio' },
            { name: 'Yes, date1',
              page: 3,
              value: '',
              id: 262153,
              type: 'text' },
            { name: 'Group99',
              page: 3,
              value: undefined,
              id: 262154,
              type: 'radio' },
            { name: 'Yes, date2',
              page: 3,
              value: '',
              id: 262155,
              type: 'text' },
            { name: 'Group100',
              page: 3,
              value: undefined,
              id: 262156,
              type: 'radio' },
            { name: 'No, state1',
              page: 3,
              value: '',
              id: 262157,
              type: 'text' },
            { name: 'Group101',
              page: 3,
              value: undefined,
              id: 262158,
              type: 'radio' },
            { name: 'Group102',
              page: 3,
              value: undefined,
              id: 262159,
              type: 'radio' },
            { name: 'Group103',
              page: 3,
              value: undefined,
              id: 262160,
              type: 'radio' },
            { name: 'Yes, date3',
              page: 3,
              value: '',
              id: 262161,
              type: 'text' },
            { name: 'Group104',
              page: 3,
              value: undefined,
              id: 262162,
              type: 'radio' },
            { name: 'No, state2',
              page: 3,
              value: '',
              id: 262163,
              type: 'text' },
            { name: 'Group105',
              page: 3,
              value: undefined,
              id: 262164,
              type: 'radio' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262165,
              type: 'radio' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262166,
              type: 'radio' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262167,
              type: 'radio' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262168,
              type: 'radio' },
            { name: 'Group96',
              page: 3,
              value: undefined,
              id: 262169,
              type: 'radio' },
            { name: 'Group99',
              page: 3,
              value: undefined,
              id: 262170,
              type: 'radio' },
            { name: 'Group100',
              page: 3,
              value: undefined,
              id: 262171,
              type: 'radio' },
            { name: 'Group101',
              page: 3,
              value: undefined,
              id: 262172,
              type: 'radio' },
            { name: 'Group102',
              page: 3,
              value: undefined,
              id: 262173,
              type: 'radio' },
            { name: 'Group103',
              page: 3,
              value: "undefined",
              id: 262174,
              type: "radio" },
            { name: "Group104",
              page: 3,
              value: "undefined",
              id: 262175,
              type: "radio" },
            { name: "Group105",
              page: 3,
              value: "undefined",
              id: 262176,
              type: "radio" } ]


          transformCB(null, result);
        },
        function CreatePDF(formValues, createPDFCB){
          // Use the pdf module to create a Gilead pdf based on the fields
          var pdfFormFill = require('pdf-fill-form');
          var fs = require('fs');

          var date = new Date();
          var currentTimeInMilliseconds = Date.now();
          var outFileName = './out/gilead-'+currentTimeInMilliseconds+'.pdf';
          var templateFilePath =  './template/gilead.pdf';

          // Show fields
          //var formFields = pdfFormFill.readSync(templateFilePath);
          //console.log(formValues.product_name_mg);

          // Write fields
          pdfFormFill.writeAsync(templateFilePath,
            formValues,
            {'save': 'imgpdf'}, function(err, result) {
              if (err) {
                createPDFCB(err);
              }

              fs.writeFile(outFileName, result, function(err) {
                if (err) {
                  createPDFCB(err);
                } else {
                  console.log('The file was saved!');

                  createPDFCB(null, outFileName);

                }
              });
            });
        }
    ], function(error, results){
      if(error)
        cb(error);
      else
        cb(null, results);
    });

  }

  Gileadform.remoteMethod('printToPdf', {
    accepts: [{arg: 'id', type: 'number'}],
    returns: {arg: 'url', type: 'string'},
    http: {path: '/:id/print', verb: 'get'},
  });
};
