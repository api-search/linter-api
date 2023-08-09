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
    
    r.forEach(function(rules) {

      console.log(rules.rule);

      ro = yaml.load(rules.rule);
    

    });

    connection.end();
    callback(null,ro);    

  });

};