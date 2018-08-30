const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors');
var pdfFillForm = require('pdf-fill-form');
var AWS = require('aws-sdk');
var fs = require('fs');
var config = require('./config.dev.json');
AWS.config.loadFromPath('./credentials.json');

var s3 = new AWS.S3();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send("Test success");
});

app.get('/fields', async (req, res) => {
    try {
        var name = req.query.name;

        var params = {
            Bucket: config.bucketName, 
            Key: "templates/"+ name + ".pdf"
        };
    
        var result = await s3.getObject(params).promise().then((response) => {
            return response;
        }).catch(error => {
            return res.json(error);
        });
    
        fs.writeFileSync("tmp.pdf", result.Body);

        var formFields = pdfFillForm.readSync('tmp.pdf');
        fs.unlink('tmp.pdf', (response, error) => {
            if(error) throw error;
            return response;
        });

        res.json(formFields);
    } catch (error) {
        res.json(error);
    }
});

app.post('/', async (req, res) => {
    try {
        var { 
            templateName,
            fileName,
            fields,
        } = req.body;
    
        var params = {
            Bucket: config.bucketName,
            Key: "templates/" + templateName +".pdf"
        };
    
        var result = await s3.getObject(params).promise().then((response) => {
            return response;
        }).catch(error => {
            return res.json(error);
        });

        fs.writeFileSync("tmp.pdf", result.Body);

        var formFields = pdfFillForm.readSync("tmp.pdf");

        var newValues = {};

        for(var field of fields) {
            for(var formField of formFields) {
                if(formField.name === field.name) {
                    newValues = {
                        ...newValues,
                        [field.name]: field.value
                    }
                }
            }
        }

        var pdf = pdfFillForm.writeSync('tmp.pdf', newValues, { "save": "pdf" } );
        console.log(newValues);
        fs.unlink('tmp.pdf', (response, error) => {
            if(error) throw error;
            return response;
        });

        var currentTimeInMilliseconds = Date.now();
        var outFileName = 'outputs/' + fileName + "_" + currentTimeInMilliseconds+'.pdf';
    
        var newFileparams = {
            Bucket: config.bucketName, 
            Key: outFileName, 
            Body: pdf,
            ACL: 'public-read',
        };
    
        var newFileResult = await s3.upload(newFileparams).promise().then((response) => {
            return response;
        }).catch(error => {
            return res.json(error);
        });
        

        res.json(newFileResult.Location);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

app.listen(3000, () => {
    console.log('3000 localhost listen...');
});