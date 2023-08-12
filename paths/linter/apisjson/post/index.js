const spectralCore = require('@stoplight/spectral-core')
const { Spectral, Document } = spectralCore

const Parsers = require('@stoplight/spectral-parsers')
const { truthy, pattern, xor } = require('@stoplight/spectral-functions')

const {
  bundleAndLoadRuleset
} = require('@stoplight/spectral-ruleset-bundler/with-loader')
const spectralRuntime = require('@stoplight/spectral-runtime')
const { fetch } = spectralRuntime

const fs = require('fs');
const path = require('path');

const { JSONPath } = require('jsonpath-plus');
const yaml = require('js-yaml');

exports.handler = async function (event) {

  var apisjson = event.body;
  
  console.log(apisjson);

  const spectral = new Spectral();
  
  const rulesetFile = await bundleAndLoadRuleset(path.resolve(__dirname + '/rules.yaml'), { fs, fetch });

  spectral.setRuleset(rulesetFile);

  let all_rules = Object.keys(spectral.ruleset.rules);
  const doc = yaml.load(apisjson, 'utf8');

  console.log(doc);

  for (let rule of all_rules) {

    console.log(rule);

  }

  const myDocument = new Document(apisjson, Parsers.Yaml);

  return spectral.run(myDocument).then(results => {
    return results;
  })   

};