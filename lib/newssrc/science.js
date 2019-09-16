'use strict';
const cheerio = require('cheerio');
const rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function sciSciAmerican(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('h2.t_listing-title')
      .find('a')
      .each(function(i, elem) {
        const article = {
          heading: $(this).text(),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function sciPopScience(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('.headline')
      .find('a')
      .each(function(i, elem) {
        const article = {
          heading: $(this).text(),
          link: 'https://www.popsci.com' + $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  sciSciAmerican: sciSciAmerican,
  sciPopScience: sciPopScience
};
