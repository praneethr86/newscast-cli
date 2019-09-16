'use strict';
const cheerio = require('cheerio');
const rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function sportsESPNF1(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('.contentItem__content').each(function(i, elem) {
      if (i > 6) {
        return false;
      }
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
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

function sportsAutoSportF1(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('.newsitem').each(function(i, elem) {
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
        heading: $(this)
          .find('a')
          .text()
          .trim()
          .replace(/\n/g, ''),
        link: `https://www.autosport.com` + linkExtension
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function sportsEPL(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };
  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    const articleMarkup = $('.featuredArticle').each(function(i, elem) {
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
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
  sportsESPNF1: sportsESPNF1,
  sportsAutoSportF1: sportsAutoSportF1,
  sportsEPL: sportsEPL
};
