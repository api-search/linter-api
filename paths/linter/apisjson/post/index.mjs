import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import Parsers from "@stoplight/spectral-parsers";
import { truthy } from "@stoplight/spectral-functions"; 

export function handler(event, context, callback) {

  console.log(event.body);

  const myDocument = new Document(event.body);

  const spectral = new Spectral();
  spectral.setRuleset({

    rules: {

      "apisjson-description": {
        given: "$.description",
        message: "Description must not be empty",
        then: {
          function: truthy,
        },
      },

    }, 

  });

  spectral.run(myDocument).then(results => {
    console.log("here are the results", results);
    callback(null,results);
  });

};