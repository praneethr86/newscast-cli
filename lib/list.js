'use strict';

var inquirer = require('inquirer');

var post = require('./post');
var reader = require('./reader');

function constructChoices(articles) {
  var choices = [];

  articles.forEach(function(article, index) {
    var choice = {
      name: article.heading,
      value: article.link
    };
    choices.push(choice);
  });
  return choices;
}

function listPosts(articles, modifier, options) {
  var choices = constructChoices(articles);

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'url',
        message: 'Select the article to read :',
        choices: choices,
        pageSize: 10
      }
    ])
    .then(answers => {
      reader.show({
        url: answers.url,
        modifier: modifier,
        website: options.value
      });
    });
}

function ls(modifier, options) {
  post.getStories(modifier, options).then(
    function(articles) {
      if (!articles.length) {
        console.log('No articles found, sorry');
        process.exit(1);
      }
      listPosts(articles, modifier, options);
    },
    function(err) {
      console.log('Oops! Something went wrong! %s', err);
    }
  );
}

module.exports = ls;
