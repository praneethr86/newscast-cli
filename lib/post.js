'use strict';
var request = require('request');
var Q = require('q');
var rp = require('request-promise');
var cheerio = require('cheerio');
var htmlToText = require('html-to-text');

//@todo move this to config.json later
//Source Hosts:
var MEDIUM_HOST = 'https://medium.com/';
var EDITORIAL_HINDU_HOST = 'https://www.thehindu.com/opinion/editorial/';
// VAR EDITORIAL_ET_HOST
// VAR EDITORIAL_NYT_HOST
var SPORTS_F1_HOST = 'http://www.espn.in/f1/';
// VAR SPORST_EPL_HOST

function requestContent(url) {
  return rp(url);
}

// Fetches data from medium website
function getContent(modifier, value, cb) {
  var url = '';

  if (modifier == 'eds') {
    //Only TheHindu for now - rest to come
    url = EDITORIAL_HINDU_HOST;
  } else if (modifier === 'sports') {
    //do nothing yet
  } else if (modifier === 'medium') {
    //do nothing yet
  }

  requestContent(url).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.100_4x_2EditorialStories')
      .find('h2')
      .find('a')
      .each(function(i, elem) {
        var article = {
          heading: $(this)
            .text()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function getStories(modifier, options) {
  var deferred = Q.defer();
  var value = options.value;

  getContent(modifier, value, function(articles) {
    if (!articles) {
      return deferred.reject();
    }

    var posts = articles;
    deferred.resolve(articles);
  });
  return deferred.promise;
}

module.exports = {
  getStories: getStories
};
