'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const htmlToText = require('html-to-text');
const Stream = require('string-stream');
const pager = require('default-pager');
const chalk = require('chalk');

function getTextFromHtml(html) {
  return htmlToText.fromString(html, {
    ignoreImage: true,
    preserveNewlines: true,
    uppercaseHeadings: true,
    singleNewLineParagraphs: true
  });
}

function printArticle(content, url) {
  const readStream = new Stream(content);
  console.log(
    '\n Visit URL:(Cmd+click) ' + chalk.yellow.underline(url) + '\n'
  );
  readStream.pipe(pager());
}

function parseContent(options) {
  const $ = cheerio.load(options.html);
  let articleMarkup = {};
  if (options.modifier === 'eds') {
    articleMarkup = readerEditorials($, options.website);
  } else if (options.modifier === 'magz') {
    articleMarkup = readerMagazines($, options.website);
  } else if (options.modifier === 'sports') {
    articleMarkup = readerSports($, options.website);
  } else if (options.modifier === 'science') {
    articleMarkup = readerScience($, options.website);
  } else if (options.modifier === 'tech') {
    articleMarkup = readerTech($, options.website);
  }
  return getTextFromHtml(articleMarkup);
}

function readerScience($, website) {
  let articleMarkup = {};
  if (website === 'sciam') {
    articleMarkup = $('div.mura-region-local')
      .find('p')
      .text();
  } else if (website === 'popsci') {
    articleMarkup = $('#article-body')
      .find('p')
      .text();
  }
  return articleMarkup;
}

function readerTech($, website) {
  let articleMarkup = {};
  if (website === 'techcrunch') {
    articleMarkup = $('div.article-content')
      .find('p')
      .text();
  } else if (website === 'tnw') {
    articleMarkup = $('div.c-post-content')
      .find('p')
      .text();
  } else if (website === 'readwrite') {
    articleMarkup = $('div.entry-content')
      .find('p')
      .text();
  } else if (website === 'bi') {
    articleMarkup = $('div.Normal')
      .find('p')
      .text();
  }
  return articleMarkup;
}

function readerSports($, website) {
  let articleMarkup = {};
  if (website == 'espnf1') {
    articleMarkup = $('div.article-body')
      .find('p')
      .text();
  } else if (website === 'autof1') {
    articleMarkup = $('div.content')
      .find('p')
      .text();
  } else if (website === 'epl') {
    articleMarkup = $('.standardArticle')
      .find('p')
      .text();
  }
  return articleMarkup;
}

function readerEditorials($, website) {
  let articleMarkup = {};
  if (website === 'hindu' || website === 'et') {
    articleMarkup = $('.article')
      .find('p')
      .text();
  } else if (website === 'hindulead') {
    articleMarkup = $('.article')
      .find('p')
      .text();
  } else if (website === 'ie' || website === 'iecolumns') {
    articleMarkup = $('div.full-details')
      .find('p')
      .text();
  } else if (website === 'hbl') {
    articleMarkup = $('.contentbody')
      .find('p')
      .text();
  } else if (website === 'guardian') {
    articleMarkup = $('div.content__article-body')
      .find('p')
      .text();
  } else if (website === 'livemint') {
    articleMarkup = $('div.mainArea')
      .find('p')
      .text();
  }
  return articleMarkup;
}

function readerMagazines($, website) {
  let articleMarkup = {};
  if (website === 'projsyn') {
    articleMarkup = $('.article__body')
      .find('p')
      .text();
  } else if (website === 'economist') {
    articleMarkup = $('div.blog-post__text')
      .find('p')
      .text();
  } else if (website === 'hbr') {
    articleMarkup = $('.article')
      .find('p')
      .text();
  } else if (website === 'atlantic') {
    articleMarkup = $('.l-article__section')
      .find('p')
      .text();
  } else if (website === 'newyorker') {
    articleMarkup = $('div.SectionBreak')
      .find('p')
      .text();
  } else if (website === 'frontline') {
    articleMarkup = $('.body-main')
      .find('p')
      .text();
  } else if (website === 'longreads') {
    articleMarkup = $('.entry-content')
      .find('p')
      .text();
  } else if (website === 'outlook') {
    articleMarkup = $('.story_description')
      .find('p')
      .text();
  } else if (website === 'hinduexplains') {
    articleMarkup = $('.article')
      .find('p')
      .text();
  }
  return articleMarkup;
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
      printArticle(content, options.url);
    },
    function() {
      console.log('Oops! Something went wrong!');
    }
  );
}

module.exports = {
  show: show
};
