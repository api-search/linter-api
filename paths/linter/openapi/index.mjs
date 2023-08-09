import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import Parsers from "@stoplight/spectral-parsers";
import { truthy } from "@stoplight/spectral-functions"; 

export function handler(event, context, callback) {

  const myDocument = new Document(
    `---
  responses:
    '200':
      description: ''`,
    Parsers.Yaml,
    "/my-file",
  );

  const spectral = new Spectral();
  spectral.setRuleset({

    rules: { // Begin Rules

      "no-empty-description": {
        given: "$..description",
        message: "Description must not be empty",
        then: {
          function: truthy,
        },
      },

    }, // End Rules

  });

  spectral.run(myDocument).then(results => {
    console.log("here are the results", results);
    callback(null,results);
  });

};