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

function listPosts(articles, options) {
  var choices = constructChoices(articles);

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'url',
        message: 'Select the article to read :',
        choices: choices,
        pageSize: 2
      }
    ])
    .then(answers => {
      reader.show({ url: answers.url });
    });
}

function ls(modifier, options) {
  post.getStories(modifier, options).then(
    function(articles) {
      if (!articles.length) {
        console.log('No articles found, sorry');
        process.exit(1);
      }
      listPosts(articles, options);
    },
    function(err) {
      console.log('Oops! Something went wrong! %s', err);
    }
  );
}

module.exports = ls;
