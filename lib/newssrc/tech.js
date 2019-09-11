'use strict';
var cheerio = require('cheerio');
var rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function techTechCrunch(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    $('h2.post-block__title')
      .find('a:first-child')
      .each(function(i, elem) {
        var article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function techTNW(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    $('h4.story-title')
      .find('a:first-child')
      .each(function(i, elem) {
        var article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  techTechCrunch: techTechCrunch,
  techTNW: techTNW
};
