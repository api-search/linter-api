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

    var r = results;

    var ro = {};

    var rules = '{';
    rules += 'rules: {';

    r.forEach(function(row) {

      ro = yaml.load(row.rule); 

      var rule_name = Object.keys(ro);
      
      rules += '"' + rule_name + '": {';
      rules += 'given: "' + ro[rule_name].given + '",';
      rules += 'message: "' + ro[rule_name].description + '",';
      rules += 'then: {';
      rules += 'function: truthy,';
      rules += '},';
      rules += '},';    

    });

    rules += '},';
    rules += '}';    

    connection.end();
    callback(null,rules);    

  });

};