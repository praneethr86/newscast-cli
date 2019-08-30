'use strict';
var request = require('request');
var Q = require('q');
var rp = require('request-promise');
var cheerio = require('cheerio');
var htmlToText = require('html-to-text');

var newssrc = require('./newssrc/newssrc');

//@todo move this to config.json later
//Source Hosts:
var EDITORIAL_IE_HOST = 'https://indianexpress.com/section/opinion/editorials/';
var EDITORIAL_HINDU_HOST = 'https://www.thehindu.com/opinion/editorial/';
var EDITORIAL_ET_HOST =
  'https://economictimes.indiatimes.com/blogs/et-editorials/';
var SPORTS_F1_HOST = 'https://www.espn.in/f1/';
var SPORTS_EPL_HOST = 'https://www.premierleague.com/news';
var YOURSTORY_HOST = 'https://yourstory.com/latest';
var EDITORIAL_GUARDIAN_HOST = 'https://www.theguardian.com/profile/editorial';

function requestContent(url) {
  return rp(url);
}

// Fetches data from medium website
function getContent(modifier, value, cb) {
  var url = '';

  if (modifier == 'eds') {
    if (value == 'hindu') {
      newssrc.edsHindu(EDITORIAL_HINDU_HOST, cb);
    } else if (value == 'et') {
      newssrc.edsET(EDITORIAL_ET_HOST, cb);
    } else if (value == 'ie') {
      newssrc.edsIE(EDITORIAL_IE_HOST, cb);
    } else if (value == 'guardian') {
      newssrc.edsGuardian(EDITORIAL_GUARDIAN_HOST, cb);
    }
  } else if (modifier === 'sports') {
    if (value == 'f1') {
      newssrc.sportsF1(SPORTS_F1_HOST, cb);
    } else if (value == 'epl') {
      newssrc.sportsEPL(SPORTS_EPL_HOST, cb);
    }
  } else if (modifier === 'yourstory') {
    if (value == 'social') {
      newssrc.yourStorySocial(YOURSTORY_HOST, cb);
    }
  }
}

function getStories(modifier, options) {
  var deferred = Q.defer();
  var value = options.value;

  getContent(modifier, value, function(articles) {
    if (!articles) {
      return deferred.reject();
    }

    var posts = articles;
    deferred.resolve(articles);
  });
  return deferred.promise;
}

module.exports = {
  getStories: getStories
};
