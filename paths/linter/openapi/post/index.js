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

exports.handler = async function (event) {

  var openapi = event;

  const spectral = new Spectral();
  
  const rulesetFile = await bundleAndLoadRuleset(path.resolve(__dirname + '/rules.yaml'), { fs, fetch });

  spectral.setRuleset(rulesetFile);

  return spectral.run(openapi).then(results => {
    return results;
  })   

};