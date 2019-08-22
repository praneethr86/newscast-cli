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
  .description('List Editorials from TheHindu, ET & NYT')
  .action(function(source, options) {
    list('eds', {
      value: source
    });
  });

program
  .command('sports')
  .arguments('<sport>')
  .description('List trending Medium Stories by tag')
  .action(function(sport, options) {
    list('sports', {
      value: sport
    });
  });

program
  .command('medium')
  .arguments('<topic>')
  .description('List Medium Stories by topic')
  .action(function(topic, options) {
    list('medium', {
      value: topic
    });
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // Show help by default
  program.outputHelp();
}
