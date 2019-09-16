'use strict';
const cheerio = require('cheerio');
const rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function techTechCrunch(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('h2.post-block__title')
      .find('a:first-child')
      .each(function(i, elem) {
        const article = {
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
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('h4.story-title')
      .find('a:first-child')
      .each(function(i, elem) {
        const article = {
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
