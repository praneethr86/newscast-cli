'use strict';
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function magzEconomist(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.teaser').each(function(i, elem) {
      var linkExtension = $(this)
        .find('a')
        .attr('href');
      var article = {
        heading: $(this)
          .find('a')
          .attr('aria-label'),
        link: `https://www.economist.com` + linkExtension
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function magzAtlantic(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.article').each(function(i, elem) {
      var linkExtension = $(this)
        .find('a')
        .attr('href');
      var article = {
        heading: $(this)
          .find('a')
          .find('h2')
          .text()
          .replace(/\n/g, ''),
        link: `https://www.theatlantic.com` + linkExtension
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function magzProjSyndicate(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.listing__title')
      .find('a:first-child')
      .each(function(i, elem) {
        var linkExtension = $(this).attr('href');
        var article = {
          heading: $(this).text(),
          link: 'https://www.project-syndicate.org' + linkExtension
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function magzHBR(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('h3.hed')
      .find('a:first-child')
      .each(function(i, elem) {
        var linkExtension = $(this).attr('href');
        var article = {
          heading: $(this).text(),
          link: 'https://hbr.org' + linkExtension
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  magzEconomist: magzEconomist,
  magzProjSyndicate: magzProjSyndicate,
  magzHBR: magzHBR,
  magzAtlantic: magzAtlantic
};
