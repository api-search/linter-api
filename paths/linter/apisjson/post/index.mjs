import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import Parsers from "@stoplight/spectral-parsers";
import { truthy } from "@stoplight/spectral-functions"; 
import yaml from 'js-yaml';
import mysql from 'mysql2';

export function handler(event, context, callback) {

  var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });  

  const apisjson = event.body;

    var sql = "SELECT rule FROM rules";
    connection.query(sql, function (error, results, fields) { 

      var rules = {
        
        rules: {
          
          "apis-json-v14-name": {
            description: "Name of APIs.json",
            given: "$",
            message: "Providing a name of your index of APIs helps ensure it will be discoverable.",
            severity: "error",
            then: {
              field: "name",
              function: truthy,
            },
          },
          "apis-json-v14-description": {
            description: "Description of APIs.json",
            given: "$",
            message: "A robust and informative description of your colleciton of APIs makes a lot sense.",
            severity: "error",
            then: {
              field: "description",
              function: truthy,
            },
          },    
          "apis-json-v14-description-empty": {
            description: "Empty Description of APIs.json",
            given: "$.description",
            message: "A robust and informative description of your colleciton of APIs makes a lot sense.",
            severity: "error",
            then: {
              function: truthy,
            },
          },                  
          "apis-json-v14-image": {
            description: "Image of APIs.json",
            given: "$",
            message: "It makes your API more presentable to have a logo or image representation.",
            severity: "error",
            then: {
              field: "image",
              function: truthy,
            },
          },    
          "apis-json-v14-image-empty": {
            description: "Empty Image of APIs.json",
            given: "$.image",
            message: "It makes your API more presentable to have a logo or image representation.",
            severity: "error",
            then: {
              function: truthy,
            },
          },   
          "apis-json-v14-image-url": {
            description: "Empty Image of APIs.json",
            given: "$.image",
            message: "It makes your API more presentable to have a logo or image representation.",
            severity: "error",
            then: {
              function: "pattern",
              functionOptions: {
                notMatch: "^((http|https)://)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$"
              },
            },
          },                    
          "apis-json-v14-tags": {
            description: "Tags for APIs.json",
            given: "$",
            message: "Using the tags property for your APIs.json helps add more metadata and make your APIs discoverable.",
            severity: "error",
            then: {
              field: "tags",
              function: truthy,
            },
          },
          "apis-json-v14-tags-one": {
            description: "One Tag for APIs.json",
            given: "$",
            message: "Having at least one tag for your APIs.json helps ensure that it will be more discoverable.",
            severity: "error",
            then: {
              function: "pattern",
              functionOptions: {
                min: 1
              },
            },
          }, 
                              
        },
        
      };

      const spectral = new Spectral();
      spectral.setRuleset(rules);      
    
      spectral.run(apisjson).then(results => {
        console.log("here are the results", results);
        callback(null,results);
      });
  

  });

};