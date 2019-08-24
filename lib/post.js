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
var EDITORIAL_ET_HOST =
  'https://economictimes.indiatimes.com/blogs/et-editorials/';
var EDITORIAL_NYT_HOST = 'https://www.nytimes.com/section/opinion/editorials';
var SPORTS_F1_HOST = 'https://www.espn.in/f1/';
var SPORTS_EPL_HOST = 'https://www.premierleague.com/news';

function requestContent(url) {
  return rp(url);
}

// Fetches data from medium website
function getContent(modifier, value, cb) {
  var url = '';

  if (modifier == 'eds') {
    if (value == 'hindu') {
      url = EDITORIAL_HINDU_HOST;
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
    } else if (value == 'et') {
      url = EDITORIAL_ET_HOST;
      console.log(`ET start url: ${url}`);
      requestContent(url).then(function(body) {
        var $ = cheerio.load(body);
        var articles = [];
        var articleMarkup = $('div.content')
          .find('a')
          .each(function(i, elem) {
            var article = {
              heading: $(this).attr('title'),
              link: $(this).attr('href')
            };
            articles[i] = article;
          });
        cb(articles);
      });
    } else if (value == 'nyt') {
      url = EDITORIAL_NYT_HOST;
    }
  } else if (modifier === 'sports') {
    if (value == 'f1') {
      url = SPORTS_F1_HOST;
      requestContent(url).then(function(body) {
        var $ = cheerio.load(body);
        var articles = [];
        var articleMarkup = $('.contentItem__content').each(function(i, elem) {
          var linkExtension = $(this)
            .find('a')
            .attr('href');
          var article = {
            heading: $(this)
              .find($('.contentItem__title'))
              .text(),
            link: `https://www.espn.in` + linkExtension
          };
          articles[i] = article;
        });
        cb(articles);
      });
    } else if (value == 'epl') {
      url = SPORTS_EPL_HOST;
      requestContent(url).then(function(body) {
        var $ = cheerio.load(body);
        var articles = [];
        var articleMarkup = $('.featuredArticle').each(function(i, elem) {
          var linkExtension = $(this)
            .find('a')
            .attr('href');
          var article = {
            heading: $(this)
              .find($('span.title'))
              .text(),
            link: `https://www.premierleague.com` + linkExtension
          };
          articles[i] = article;
        });
        cb(articles);
      });
    }
  } else if (modifier === 'medium') {
    url = MEDIUM_HOST;
  }
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
