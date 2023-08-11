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
          "apis-json-v14-maintainers-one": {
            description: "One Maintainers for APIs.json",
            message: "Having at least one maintainer for your APIs.json helps build trust and provenance for your APis.",
            given: "$",
            severity: "error",
            then: {
              field: "maintainers",
              function: "length",
              functionOptions: {
                min: 1,
                max: 5,
              },
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