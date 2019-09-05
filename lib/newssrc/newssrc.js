'use strict';
var request = require('request');
var cheerio = require('cheerio');
var rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function edsHindu(url, cb) {
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

function edsET(url, cb) {
  requestContent(url).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('div.content')
      .find('a')
      .each(function(i, elem) {
        if (i > 4) {
          return false;
        }
        var article = {
          heading: $(this).attr('title'),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsHBL(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('article.editorial')
      .find('a:first-child')
      .each(function(i, elem) {
        if (i > 4) {
          return false;
        }
        var article = {
          heading: $(this).text(),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsIndExp(url, cb) {
  var options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('div.m-article-landing__inner')
      .find('h2')
      .find('a')
      .each(function(i, elem) {
        if (i > 3) {
          return false;
        }
        var article = {
          heading: $(this).attr('title'),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function sportsF1(url, cb) {
  requestContent(url).then(function(body) {
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
  requestContent(url).then(function(body) {
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

// function yourStorySocial(url, cb) {
//   requestContent(url).then(function(body) {
//     var $ = cheerio.load(body);
//     var articles = [];
//     var articleMarkup = $('.sc-fONwsr').each(function(i, elem) {
//       if (i > 9) {
//         return false;
//       }
//       var linkExtension = $(this)
//         .find('a')
//         .attr('href');
//       var article = {
//         heading: $(this)
//           .find('a > div > div > span')
//           .text()
//           .replace(/\n/g, ''),
//         link: `https://yourstory.com` + linkExtension
//       };
//       articles[i] = article;
//     });
//     cb(articles);
//   });
// }

function edsEconomist(url, cb) {
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

function edsGuardian(url, cb) {
  requestContent(url).then(function(body) {
    var $ = cheerio.load(body);
    var articles = [];
    var articleMarkup = $('.fc-item__content').each(function(i, elem) {
      if (i > 3) {
        return false;
      }
      var article = {
        heading: $(this)
          .find('a')
          .text()
          .replace(/\n/g, ''),
        link: $(this)
          .find('a')
          .attr('href')
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function projSyndicate(url, cb) {
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

function hbrLatest(url, cb) {
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
  edsHindu: edsHindu,
  edsET: edsET,
  edsIE: edsIndExp,
  edsHBL: edsHBL,
  edsGuardian: edsGuardian,
  edsEconomist: edsEconomist,
  sportsF1: sportsF1,
  sportsEPL: sportsEPL,
  // yourStorySocial: yourStorySocial,
  projSyndicate: projSyndicate,
  hbrLatest: hbrLatest
};
