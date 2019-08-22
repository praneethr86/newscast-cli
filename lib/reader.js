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
  var articleMarkup = $('.article')
    .find('p')
    .text();
  var content = getTextFromHtml(articleMarkup);
  return content;
}

function requestContent(url) {
  return rp(url);
}

function show(options) {
  requestContent(options.url).then(
    function(body) {
      var content = parseContent({ html: body });
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
