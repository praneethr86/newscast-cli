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
  .description('List Editorials from TheHindu, ET, Guardian')
  .action(function(source, options) {
    list('eds', {
      value: source
    });
  });

program
  .command('magz')
  .arguments('<source>')
  .description(
    'List Editorials from ProjectSyndicate, Economist, NewYorker, TheAtlantic'
  )
  .action(function(source, options) {
    list('magz', {
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

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // Show help by default
  program.outputHelp();
}
