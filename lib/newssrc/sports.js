'use strict';
const cheerio = require('cheerio');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({  
  rejectUnauthorized: false
});

function sportsESPNF1(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.contentItem__content').each(function(i, elem) {
      if (i > 6) {
        return false;
      }
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
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

function sportsAutoSportF1(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.newsitem').each(function(i, elem) {
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
        heading: $(this)
          .find('a')
          .text()
          .trim()
          .replace(/\n/g, ''),
        link: `https://www.autosport.com` + linkExtension
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function sportsEPL(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    const articleMarkup = $('.featuredArticle').each(function(i, elem) {
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
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

module.exports = {
  sportsESPNF1: sportsESPNF1,
  sportsAutoSportF1: sportsAutoSportF1,
  sportsEPL: sportsEPL
};
