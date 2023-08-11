const spectralCore = require('@stoplight/spectral-core')
const { Spectral, Document } = spectralCore

const Parsers = require('@stoplight/spectral-parsers')
const { truthy, pattern, xor } = require('@stoplight/spectral-functions')

const {
  bundleAndLoadRuleset
} = require('@stoplight/spectral-ruleset-bundler/with-loader')
const spectralRuntime = require('@stoplight/spectral-runtime')
const { fetch } = spectralRuntime

const fs = require('fs')
const path = require('path')

const { JSONPath } = require('jsonpath-plus')
const yaml = require('js-yaml')
const { v4: uuidv4 } = require('uuid');

const mysql  = require('mysql');

exports.handler = async function (event) {

  var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });  

  var ruleset = JSON.stringify(event.ruleset);
  var openapi = JSON.stringify(event.openapi);

    if (!ruleset || ruleset == '' || !openapi || openapi == '') {

      throw new Error("Ruleset and API spec are required for validation.");

    } 
    else {

      console.log("Inside!");
        
      var ruleset = '{rules: {apis-json-v14-name: {description: Name of APIs.json, message: Providing a name of your index of APIs helps ensure it will be discoverable., given: $, severity: error, then: {field: name, function: truthy}}, apis-json-v14-description: {description: Description of APIs.json, message: A robust and informative description of your colleciton of APis makes a lot sense., given: $, severity: error, then: {field: description, function: truthy}}, apis-json-v14-image: {description: Image of APIs.json, message: It makes your API more presentable to have a logo or image representation., given: $, severity: error, then: {field: description, function: truthy}}, apis-json-v14-url: {description: URL for APIs.json, message: Providing a reference to where your APIs.json is located is a valuable references., given: $, severity: error, then: {field: url, function: truthy}}, apis-json-v14-tags: {description: Tags for APIs.json, message: Using the tags property for your APIs.json helps add more metadata and make your APIs discoverable., given: $, severity: error, then: {field: tags, function: truthy}}, apis-json-v14-tags-one: {description: One Tag for APIs.json, message: Having at least one tag for your APIs.json helps ensure that it will be more discoverable., given: $, severity: error, then: {field: tags, function: length, functionOptions: {min: 1}}}, apis-json-v14-maintainers: {description: Maintainers for APIs.json, message: Using the maintainers property for your APIs.json helps build trust and provenance for your APis., given: $, severity: error, then: {field: maintainers, function: truthy}}, apis-json-v14-maintainers-one: {description: One Maintainers for APIs.json, message: Having at least one maintainer for your APIs.json helps build trust and provenance for your APis., given: $, severity: error, then: {field: maintainers, function: length, functionOptions: {min: 1}}}, apis-json-v14-maintainers-fn: {description: Maintainers for APIs.json, message: Providing an FN for maintainers helps build trust and provide a point of contact for your APIs.json., given: $.maintainers.*, severity: error, then: {field: FN, function: truthy}}, apis-json-v14-maintainers-email: {description: Maintainers Email, message: Providing an email address for maintainers helps build trust and provide a point of contact for your APIs.json., given: $.maintainers.*, severity: error, then: {field: email, function: truthy}}, apis-json-v14-apis-name: {description: Name of APIs, message: Providing a name of your index of APIs helps ensure it will be discoverable., given: $.apis.*, severity: error, then: {field: name, function: truthy}}, apis-json-v14-apis-description: {description: Description of APIs, message: A robust and informative description of your colleciton of APis makes a lot sense., given: $.apis.*, severity: error, then: {field: description, function: truthy}}, apis-json-v14-apis-image: {description: Image of APIs, message: It makes your API more presentable to have a logo or image representation., given: $.apis.*, severity: error, then: {field: image, function: truthy}}, apis-json-v14-apis-humanURL: {description: Human URL for APIs, message: Your API should have the human URL included to help provide a single link to your API., given: $.apis.*, severity: error, then: {field: humanURL, function: truthy}}, apis-json-v14-apis-baseURL: {description: Base URL for APIs, message: Your API should have the base URL included to help provide a unique identifier for your API., given: $.apis.*, severity: error, then: {field: baseURL, function: truthy}}, apis-json-v14-apis-tags: {description: Tags for API, message: Using the tags property for your APIs helps add more metadata and make your APIs discoverable., given: $.apis.*, severity: error, then: {field: tags, function: truthy}}, apis-json-v14-apis-tags-one: {description: One Tag for API, message: Having at least one tag for your APIs helps ensure that it will be more discoverable., given: $.apis.*, severity: error, then: {field: tags, function: length, functionOptions: {min: 1}}}, apis-json-v14-apis-properties-url: {description: API Properties URL, message: All the URLs for your properties should be a valid URL., given: $.apis.*.properties.*, then: [{field: url, function: pattern, functionOptions: {match: '^((http|https)://)[-a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$'}}]}, apis-json-v14-apis-properties-documentation: {description: API Properties Documentation, message: Providing a URL to your API documentation helps onboard users to what they will need to learn about your APIs., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(documentation)\b}}]}, apis-json-v14-apis-properties-documentation-postman-collection: {description: API Properties Documentation Postman Collection, message: 'Providing a Postman collection is a great way to provide usable reference, onboarding, and workflow documentation.', given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(postman-collection)\b}}]}, apis-json-v14-apis-properties-documentation-openapi: {description: API Properties Documentation OpenAPI, message: Providing an OpenAPI for your API provides consumers with a contract of what your API delivers., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(openapi)\b}}]}, apis-json-v14-apis-properties-workspaces-postman-public: {description: API Properties Workspaces Postman Public, message: Providing a URL to your Postman public workspace provides consumers with a place to engage around your API., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(postman-public-workspace)\b}}]}, apis-json-v14-apis-properties-workspaces-github-public: {description: API Properties Workspaces GitHub Public, message: Providing a URL to your GitHub public repositories provides consumers with a place to engage around your API., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(github-repository)\b}}]}, apis-json-v14-apis-properties-management-getting-started: {description: API Properties Management Getting Started, message: Offering a getting started resource for your consumers helps reduce friction when onboarding with your API., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-getting-started)\b}}]}, apis-json-v14-apis-properties-management-plans: {description: API Properties Management Plans, message: Offering a dedicated plans page helps increase the awareness amongst consumers regarding the access tiers for your API., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-plans)\b}}]}, apis-json-v14-apis-properties-management-authentication: {description: API Properties Management Authentication, message: Offering a dedicated authentication page for your API helps reduce friction with consumers when onboarding and putting APIs to work., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-authentication)\b}}]}, apis-json-v14-apis-properties-change-road-map: {description: API Properties Change Road Map, message: Offering a road map for your API helps increase the awareness with your consumers that change is coming., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-road-map)\b}}]}, apis-json-v14-apis-properties-change-change-log: {description: API Properties Change Change Log, message: 'Offering a change log helps increase awareness with consumers that changes have occurred, providing a place to stay up to date.', given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-change-log)\b}}]}, apis-json-v14-apis-properties-environments-sandbox: {description: API Properties Environments Sandbox, message: Offering a sandbox environment provides an easy way for consumers to explore your API when onboarding., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-environment-sandbox)\b}}]}, apis-json-v14-apis-properties-environments-production: {description: API Properties Environments Production, message: Offering a production environment makes it easy for consumers to access the details they need to work with an API in production., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-environment-production)\b}}]}, apis-json-v14-apis-properties-sdk-python: {description: API Properties SDK Python, message: Offering a Python SDK for consumers to use will save them time when it comes to onboarding and integrating an API into their applications., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-sdk-python)\b}}]}, apis-json-v14-apis-properties-sdk-go: {description: API Properties SDK Go, message: Offering a Go SDK for consumers to use will save them time when it comes to onboarding and integrating an API into their applications., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-sdk-go)\b}}]}, apis-json-v14-apis-properties-sdk-node: {description: API Properties SDK Node, message: Offering a Node SDK for consumers to use will save them time when it comes to onboarding and integrating an API into their applications., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-sdk-node)\b}}]}, apis-json-v14-apis-properties-sdk-java: {description: API Properties Java Node, message: Offering a Java SDK for consumers to use will save them time when it comes to onboarding and integrating an API into their applications., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-sdk-java)\b}}]}, apis-json-v14-apis-properties-communications-blog: {description: API Properties Communications Blog, message: Offering a blog that is dedicated to your API helps increase engagement with consumers and help ensure they are more aware of what is happening., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(blog)\b}}]}, apis-json-v14-apis-properties-communications-video: {description: API Properties Communications Video, message: Offering a video channel that is dedicated to your API helps increase engagement with consumers and help ensure they are more aware of what is happening., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(videos)\b}}]}, apis-json-v14-apis-properties-support-support: {description: API Properties Support Support, message: Offering a formal support page and channel helps make it easy for consumers to find the help they need with putting aPIs to work., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(support)\b}}]}, apis-json-v14-apis-properties-support-issues: {description: API Properties Support Issues, message: Offering a support using GitHub issues offers an easy way to encourage consumers to submit issues and communicate in a self-service way., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(issues)\b}}]}, apis-json-v14-apis-properties-support-email: {description: API Properties Email email, message: Offering a dedicated email channel for your API makes it very simple for consumers to get the support they need when using your API., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(email)\b}}]}, apis-json-v14-apis-properties-legal-terms-of-service: {description: API Properties Legal Support, message: Offering a dedicated terms of service page helps ensure consumers are aware of what is expected when it comes to using a service., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-terms-of-service)\b}}]}, apis-json-v14-apis-properties-legal-license: {description: API Properties Legal License, message: 'Offering a dedicated licensing page helps ensure consumers are aware of the licensing for an API, SDKs, and other supporting resources.', given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-license)\b}}]}, apis-json-v14-apis-properties-legal-privacy-policy: {description: API Properties Legal Privacy Policy, message: Offering a dedicated privacy policy page helps ensure consumers are aware of the privacy requirements surrounding using an API., given: $.apis.*.properties.*, then: [{field: type, function: pattern, functionOptions: {notMatch: \b(api-privacy-policy)\b}}]}}}';

      const spectral = new Spectral();

      let uniqueFileId = uuidv4();

      fs.writeFileSync(`/tmp/.${uniqueFileId}.yaml`, ruleset);

      const rulesetFile = await bundleAndLoadRuleset(path.resolve(`/tmp/.${uniqueFileId}.yaml`), { fs, fetch });

      console.log(rulesetFile);

      spectral.setRuleset(rulesetFile);

      fs.unlinkSync(`/tmp/.${uniqueFileId}.yaml`);

      let ruleNames = Object.keys(spectral.ruleset.rules);
      const doc = yaml.load(openapi, 'utf8');

      console.log(doc);

      let ruleMatches = []

      for (let rule of ruleNames) {

        let givenPaths = spectral.ruleset.rules[rule].definition.given;

        //Given field can be a string or an array
        if (typeof givenPaths == 'string') {
          givenPaths = [givenPaths]
        }

        for (let path of givenPaths) {

          //First we need to check whether this is a JSONPath or an Alias
          switch(path.charAt(0)) {
            case "$":
              let results = JSONPath({ path: path, json: doc })
              ruleMatches.push({
                path: path,
                matches: results
              })
              break;
            case "#":
              ruleMatches.push({
                path: path,
                matches: ["JSON Path targeting is not supported with aliases."]
              })
              break;
            default:
              console.log("This is neither");
              break;
          } 

        }
      }

      const myDocument = new Document(openapi, Parsers.Yaml);
      console.log("Finishing!");

      return spectral.run(myDocument).then(results => {
        callback(null,results);
      })   

    }

};