'use strict';
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function sportsF1(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.contentItem__content').each(function(i, elem) {
      if (i > 6) {
        return false;
      }
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
}

function sportsEPL(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };
  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.featuredArticle').each(function(i, elem) {
      if (i > 6) {
        return false;
      }
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

module.exports = {
  sportsF1: sportsF1,
  sportsEPL: sportsEPL
};
