#!/usr/bin/env node
'use strict';
var path = require('path');
var program = require('commander');

var list = require('./lib/list');

var pkg = require(path.join(__dirname, 'package.json'));

program.version(pkg.version).description(pkg.description);

program
  .command('eds')
  .arguments('<source>')
  .description('List Editorials from TheHindu, ET, NYT & Guardian')
  .action(function(source, options) {
    list('eds', {
      value: source
    });
  });

program
  .command('sports')
  .arguments('<sport>')
  .description('List trending Sports Stories from F1, EPL world')
  .action(function(sport, options) {
    list('sports', {
      value: sport
    });
  });

program
  .command('yourstory')
  .arguments('<topic>')
  .description('List articles for SocialStory latest from YourStory')
  .action(function(topic, options) {
    list('yourstory', {
      value: topic
    });
  });

program
  .command('projsyn')
  .arguments('<topic>')
  .description('List articles for Project Syndicate')
  .action(function(topic, options) {
    list('projsyn', {
      value: topic
    });
  });

program
  .command('hbr')
  .arguments('<filter>')
  .description('List articles for HBR')
  .action(function(filter, options) {
    list('hbr', {
      value: filter
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // Show help by default
  program.outputHelp();
}
