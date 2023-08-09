import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import Parsers from "@stoplight/spectral-parsers";
import { truthy } from "@stoplight/spectral-functions"; 

export function handler(event, context, callback) {

  const apisjson = event.body;

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

  spectral.run(apisjson).then(results => {
    console.log("here are the results", results);
    callback(null,results);
  });

};