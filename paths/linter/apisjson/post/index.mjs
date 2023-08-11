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

          "apis-json-v14-maintainers": {
            description: "Maintainers for APIs.json",
            message: "Using the maintainers property for your APIs.json helps build trust and provenance for your APis.",
            given: "$",
            severity: "error",
            then: {
              field: "maintainers",
              function: truthy,
            },
          },
          "apis-json-v14-maintainers-fn": {
            description: "Maintainers for APIs.json",
            message: "Providing an FN for maintainers helps build trust and provide a point of contact for your APIs.json.",
            given: "$.maintainers.*",
            severity: "error",
            then: {
              field: "FN",
              function: truthy,
            },
          },
          "apis-json-v14-maintainers-email": {
            description: "Maintainers Email",
            message: "Providing an email address for maintainers helps build trust and provide a point of contact for your APIs.json.",
            given: "$.maintainers.*",
            severity: "error",
            then: {
              field: "email",
              function: truthy,
            },
          },          
           
          "apis-json-v14-apis-name": {
            description: "Name of APIs",
            message: "Providing a name of your index of APIs helps ensure it will be discoverable.",
            given: "$.apis.*",
            severity: "error",
            then: {
              field: "name",
              function: truthy,
            },
          }, 
          "apis-json-v14-apis-description": {
            description: "Description of APIs",
            message: "A robust and informative description of your colleciton of APis makes a lot sense.",
            given: "$.apis.*",
            severity: "error",
            then: {
              field: "description",
              function: truthy,
            },
          }, 
          "apis-json-v14-apis-image": {
            description: "Image of APIs",
            message: "It makes your API more presentable to have a logo or image representation.",
            given: "$.apis.*",
            severity: "error",
            then: {
              field: "image",
              function: truthy,
            },
          }, 
          "apis-json-v14-apis-humanURL": {
            description: "Human URL for APIs",
            message: "Your API should have the human URL included to help provide a single link to your API.",
            given: "$.apis.*",
            severity: "error",
            then: {
              field: "humanURL",
              function: truthy,
            },
          }, 
          "apis-json-v14-apis-baseURL": {
            description: "Base URL for APIs",
            message: "Your API should have the base URL included to help provide a unique identifier for your API.",
            given: "$.apis.*",
            severity: "error",
            then: {
              field: "baseURL",
              function: truthy,
            },
          }, 
          "apis-json-v14-apis-tags": {
            description: "Tags for API",
            message: "Using the tags property for your APIs helps add more metadata and make your APIs discoverable.",
            given: "$.apis.*",
            severity: "error",
            then: {
              field: "tags",
              function: truthy,
            },
          },                    
                        

        },
        
      };

      const spectral = new Spectral();
      spectral.setRuleset(rules);      
    
      connection.end();

      spectral.run(apisjson).then(results => {
        console.log("here are the results", results);
        callback(null,results);
      });
  

  });

};