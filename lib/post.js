'use strict';
var request = require('request');
var Q = require('q');
var rp = require('request-promise');

var editorials = require('./newssrc/editorials');
var magazines = require('./newssrc/magazines');
var sports = require('./newssrc/sports');

//@todo move this to config.json later
//Source Hosts:
var EDITORIAL_IE_HOST = 'https://indianexpress.com/section/opinion/editorials/';
var EDITORIAL_HINDU_HOST = 'https://www.thehindu.com/opinion/editorial/';
var EDITORIAL_ET_HOST =
  'https://economictimes.indiatimes.com/blogs/et-editorials/';
var EDITORIAL_HBL_HOST =
  'https://www.thehindubusinessline.com/opinion/editorial/';
var SPORTS_F1_HOST = 'https://www.espn.in/f1/';
var SPORTS_EPL_HOST = 'https://www.premierleague.com/news';
var EDITORIAL_GUARDIAN_HOST = 'https://www.theguardian.com/profile/editorial';
var PROJECT_SYNDICATE_HOST = 'https://www.project-syndicate.org/';
var HBR_LATEST_HOST = 'https://hbr.org/the-latest';
var ECONOMIST_LATEST_HOST = 'https://www.economist.com/latest/';
var ATLANTIC_LATEST_HOST = 'https://www.theatlantic.com/latest/';

function requestContent(url) {
  return rp(url);
}

function getContent(modifier, value, cb) {
  if (modifier == 'eds') {
    if (value == 'hindu') {
      editorials.edsHindu(EDITORIAL_HINDU_HOST, cb);
    } else if (value == 'et') {
      editorials.edsET(EDITORIAL_ET_HOST, cb);
    } else if (value == 'ie') {
      editorials.edsIE(EDITORIAL_IE_HOST, cb);
    } else if (value == 'hbl') {
      editorials.edsHBL(EDITORIAL_HBL_HOST, cb);
    } else if (value == 'guardian') {
      editorials.edsGuardian(EDITORIAL_GUARDIAN_HOST, cb);
    }
  } else if (modifier === 'magz') {
    if (value == 'economist') {
      magazines.magzEconomist(ECONOMIST_LATEST_HOST, cb);
    } else if (value === 'projsyn') {
      magazines.magzProjSyndicate(PROJECT_SYNDICATE_HOST, cb);
    } else if (value === 'hbr') {
      magazines.magzHBR(HBR_LATEST_HOST, cb);
    } else if (value === 'atlantic') {
      magazines.magzAtlantic(ATLANTIC_LATEST_HOST, cb);
    }
  } else if (modifier === 'sports') {
    if (value == 'f1') {
      sports.sportsF1(SPORTS_F1_HOST, cb);
    } else if (value == 'epl') {
      sports.sportsEPL(SPORTS_EPL_HOST, cb);
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
