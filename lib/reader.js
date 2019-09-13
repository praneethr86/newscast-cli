'use strict';

var rp = require('request-promise');
var cheerio = require('cheerio');
var htmlToText = require('html-to-text');
var Stream = require('string-stream');
var pager = require('default-pager');

function getTextFromHtml(html) {
  return htmlToText.fromString(html);
}

function printArticle(content) {
  var readStream = new Stream(content);
  readStream.pipe(
    pager(function() {
      console.log('(END)');
    })
  );
}

function parseContent(options) {
  var $ = cheerio.load(options.html);
  var articleMarkup = {};
  if (options.modifier == 'eds') {
    if (options.website == 'hindu' || options.website == 'et') {
      articleMarkup = $('.article')
        .find('p')
        .text();
    } else if (options.website == 'ie') {
      articleMarkup = $('div.o-story-content__main')
        .find('p')
        .text();
    } else if (options.website == 'hbl') {
      articleMarkup = $('.contentbody')
        .find('p')
        .text();
    } else if (options.website == 'guardian') {
      articleMarkup = $('div.content__article-body')
        .find('p')
        .text();
    } else if (options.website == 'livemint') {
      articleMarkup = $('div.mainArea')
        .find('p')
        .text();
    }
  } else if (options.modifier == 'magz') {
    if (options.website == 'projsyn') {
      articleMarkup = $('.article__body')
        .find('p')
        .text();
    } else if (options.website == 'economist') {
      articleMarkup = $('div.blog-post__text')
        .find('p')
        .text();
    } else if (options.website == 'hbr') {
      articleMarkup = $('.article')
        .find('p')
        .text();
    } else if (options.website == 'atlantic') {
      articleMarkup = $('.l-article__section')
        .find('p')
        .text();
    } else if (options.website == 'newyorker') {
      articleMarkup = $('div.SectionBreak')
        .find('p')
        .text();
    } else if (options.website == 'frontline') {
      articleMarkup = $('.body-main')
        .find('p')
        .text();
    }
  } else if (options.modifier == 'sports') {
    if (options.website == 'espnf1') {
      articleMarkup = $('div.article-body')
        .find('p')
        .text();
    } else if (options.website == 'autof1') {
      articleMarkup = $('div.content')
        .find('p')
        .text();
    } else if (options.website == 'epl') {
      articleMarkup = $('.standardArticle')
        .find('p')
        .text();
    }
  } else if (options.modifier === 'science') {
    if (options.website == 'sciam') {
      articleMarkup = $('div.mura-region-local')
        .find('p')
        .text();
    }
  } else if (options.modifier === 'tech') {
    if (options.website == 'techcrunch') {
      articleMarkup = $('div.article-content')
        .find('p')
        .text();
    } else if (options.website == 'tnw') {
      articleMarkup = $('div.c-post-content')
        .find('p')
        .text();
    }
  }
  return getTextFromHtml(articleMarkup);
}

function requestContent(url) {
  return rp(url);
}

function show(options) {
  var optionsParams = {
    url: options.url,
    rejectUnauthorized: false
  };

  requestContent(optionsParams).then(
    function(body) {
      var content = parseContent({
        html: body,
        modifier: options.modifier,
        website: options.website
      });
      printArticle(content);
    },
    function() {
      console.log('Oops! Something went wrong!');
    }
  );
}

module.exports = {
  show: show
};
