'use strict';
var cheerio = require('cheerio');
var rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function sciSciAmerican(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    $('h2.t_listing-title').each(function(i, elem) {
      var article = {
        heading: $(this)
          .find('a')
          .text(),
        link: $(this)
          .find('a')
          .attr('href')
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

module.exports = {
  sciSciAmerican: sciSciAmerican
};
