import spectralCore from "@stoplight/spectral-core";
const { Spectral, Document } = spectralCore;
import Parsers from "@stoplight/spectral-parsers";
import { truthy } from "@stoplight/spectral-functions"; 
import yaml from 'js-yaml';

export function handler(event, context, callback) {

  const apisjson = event.body;

  var sql = "SELECT rule FROM rules";
  connection.query(sql, function (error, results, fields) { 

    results.forEach(function(rules) {

      console.log(rules.rule);

    });

    callback(null,results);

  });

};