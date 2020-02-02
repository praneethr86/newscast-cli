'use strict';
const cheerio = require('cheerio');
const rp = require('request-promise');

function requestContent(url) {
  return rp(url);
}

function edsHindu(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('.100_4x_2EditorialStories')
      .find('h2')
      .find('a')
      .each(function(i, elem) {
        const article = {
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

function edsHinduLead(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('div.story-card-news')
      .find('h3')
      .find('a')
      .each(function(i, elem) {
        const article = {
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
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('div.content')
      .find('a')
      .each(function(i, elem) {
        const article = {
          heading: $(this).attr('title'),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsHBL(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('article.editorial')
      .find('a:first-child')
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

//Same function works for both IE editorials and IE columnists
function edsIndExp(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };

  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('div.profile-container')
      .find('h2')
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

function edsGuardian(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };
  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('.fc-item__content').each(function(i, elem) {
      if (i > 3) {
        return false;
      }
      const article = {
        heading: $(this)
          .find('a')
          .text()
          .replace(/\n/g, '')
          .replace('The Guardian view on ', ''),
        link: $(this)
          .find('a')
          .attr('href')
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function edsLivemint(url, cb) {
  const options = {
    url: url,
    rejectUnauthorized: false
  };
  requestContent(options).then(function(body) {
    const $ = cheerio.load(body);
    const articles = [];
    $('.linkclick-candidate')
      .find($('.headline'))
      .each(function(i, elem) {
        const article = {
          heading: $(this)
            .find('a')
            .text()
            .replace(/Opinion \| /g, ''),
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
  edsHindu: edsHindu,
  edsHinduLead: edsHinduLead,
  edsET: edsET,
  edsIE: edsIndExp,
  edsHBL: edsHBL,
  edsGuardian: edsGuardian,
  edsLivemint: edsLivemint
};
