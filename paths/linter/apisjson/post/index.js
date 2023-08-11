const spectralCore = require('@stoplight/spectral-core')
const { Spectral, Document } = spectralCore

const Parsers = require('@stoplight/spectral-parsers')
const { truthy, pattern, xor } = require('@stoplight/spectral-functions')

const {
  bundleAndLoadRuleset
} = require('@stoplight/spectral-ruleset-bundler/with-loader')
const spectralRuntime = require('@stoplight/spectral-runtime')
const { fetch } = spectralRuntime

const fs = require('fs')
const path = require('path')

const { JSONPath } = require('jsonpath-plus')
const yaml = require('js-yaml')
const { v4: uuidv4 } = require('uuid');

const mysql  = require('mysql');
const https  = require('https');

exports.handler = function (event, context, callback) {

  var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });  

  var ruleset = JSON.stringify(event.ruleset);
  var openapi = JSON.stringify(event.openapi);

    if (!ruleset || ruleset == '' || !openapi || openapi == '') {

      throw new Error("Ruleset and API spec are required for validation.");

    } 
    else {

      console.log("Inside!");

      var sql = "SELECT name,rule FROM rules';
      connection.query(sql, function (error, results, fields) { 
        
          if(results && results.length > 0){   
            
            var ruleset = 'rules:\r\n';

            for(let row of rows) {
              ruleset += row.rule;
            }

            console.log(ruleset);

            const spectral = new Spectral();

            let uniqueFileId = uuidv4();

            fs.writeFileSync(`/tmp/.${uniqueFileId}.yml`, ruleset);

            const rulesetFile = bundleAndLoadRuleset(path.resolve(`/tmp/.${uniqueFileId}.yml`), { fs, fetch });

            console.log(rulesetFile);

            spectral.setRuleset(rulesetFile);

            fs.unlinkSync(`/tmp/.${uniqueFileId}.yml`);

            let ruleNames = Object.keys(spectral.ruleset.rules);
            const doc = yaml.load(openapi, 'utf8');

            console.log(doc);

            let ruleMatches = []

            for (let rule of ruleNames) {

              let givenPaths = spectral.ruleset.rules[rule].definition.given;

              //Given field can be a string or an array
              if (typeof givenPaths == 'string') {
                givenPaths = [givenPaths]
              }

              for (let path of givenPaths) {

                //First we need to check whether this is a JSONPath or an Alias
                switch(path.charAt(0)) {
                  case "$":
                    let results = JSONPath({ path: path, json: doc })
                    ruleMatches.push({
                      path: path,
                      matches: results
                    })
                    break;
                  case "#":
                    ruleMatches.push({
                      path: path,
                      matches: ["JSON Path targeting is not supported with aliases."]
                    })
                    break;
                  default:
                    console.log("This is neither");
                    break;
                } 

              }
            }

            const myDocument = new Document(openapi, Parsers.Yaml);
            console.log("Finishing!");

            return spectral.run(myDocument).then(results => {
              callback(null,results);
            })   
            
          }
      });


    }

};