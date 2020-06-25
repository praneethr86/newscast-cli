'use strict';

const inquirer = require('inquirer');
const chalk = require('chalk');

const post = require('./post');
const reader = require('./reader');

function constructChoices(articles) {
  const choices = [];

  articles.forEach(function(article, index) {
    const choice = {
      name: article.heading,
      value: article.link
    };
    choices.push(choice);
  });
  return choices;
}

function listPosts(articles, modifier, options) {
  const choices = constructChoices(articles);

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'url',
        message: chalk.magenta('Select the article to read :'),
        choices: choices,
        pageSize: 10,
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
