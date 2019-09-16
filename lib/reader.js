'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');
const Stream = require('string-stream');
const pager = require('default-pager');
const chalk = require('chalk');

function getTextFromHtml(html) {
  return htmlToText.fromString(html);
}

function printArticle(content) {
  const readStream = new Stream(content);
  readStream.pipe(
    pager(function() {
      console.log('(END)');
    })
  );
}

function parseContent(options) {
  const $ = cheerio.load(options.html);
  let articleMarkup = {};
  if (options.modifier === 'eds') {
    if (options.website === 'hindu' || options.website === 'et') {
      articleMarkup = $('.article')
        .find('p')
        .text();
    } else if (options.website === 'hindulead') {
      articleMarkup = $('.article')
        .find('p')
        .text();
    } else if (options.website === 'ie' || options.website === 'iecolumns') {
      articleMarkup = $('div.o-story-content__main')
        .find('p')
        .text();
    } else if (options.website === 'hbl') {
      articleMarkup = $('.contentbody')
        .find('p')
        .text();
    } else if (options.website === 'guardian') {
      articleMarkup = $('div.content__article-body')
        .find('p')
        .text();
    } else if (options.website === 'livemint') {
      articleMarkup = $('div.mainArea')
        .find('p')
        .text();
    }
  } else if (options.modifier === 'magz') {
    if (options.website === 'projsyn') {
      articleMarkup = $('.article__body')
        .find('p')
        .text();
    } else if (options.website === 'economist') {
      articleMarkup = $('div.blog-post__text')
        .find('p')
        .text();
    } else if (options.website === 'hbr') {
      articleMarkup = $('.article')
        .find('p')
        .text();
    } else if (options.website === 'atlantic') {
      articleMarkup = $('.l-article__section')
        .find('p')
        .text();
    } else if (options.website === 'newyorker') {
      articleMarkup = $('div.SectionBreak')
        .find('p')
        .text();
    } else if (options.website === 'frontline') {
      articleMarkup = $('.body-main')
        .find('p')
        .text();
    }
  } else if (options.modifier === 'sports') {
    if (options.website == 'espnf1') {
      articleMarkup = $('div.article-body')
        .find('p')
        .text();
    } else if (options.website === 'autof1') {
      articleMarkup = $('div.content')
        .find('p')
        .text();
    } else if (options.website === 'epl') {
      articleMarkup = $('.standardArticle')
        .find('p')
        .text();
    }
  } else if (options.modifier === 'science') {
    if (options.website === 'sciam') {
      articleMarkup = $('div.mura-region-local')
        .find('p')
        .text();
    } else if (options.website === 'popsci') {
      articleMarkup = $('#article-body')
        .find('p')
        .text();
    }
  } else if (options.modifier === 'tech') {
    if (options.website === 'techcrunch') {
      articleMarkup = $('div.article-content')
        .find('p')
        .text();
    } else if (options.website === 'tnw') {
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
  const optionsParams = {
    url: options.url,
    rejectUnauthorized: false
  };

  requestContent(optionsParams).then(
    function(body) {
      const content = parseContent({
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
