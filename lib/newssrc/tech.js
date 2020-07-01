'use strict';
const cheerio = require('cheerio');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({  
  rejectUnauthorized: false
});

function techTechCrunch(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('h2.post-block__title')
      .find('a:first-child')
      .each(function(i, elem) {
        const article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function techTNW(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('h4.story-title')
      .find('a:first-child')
      .each(function(i, elem) {
        const article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function techReadWrite(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('h2.entry-title')
      .find('a')
      .each(function(i, elem) {
        const article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function techBI(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.toplist_heading, .liststories_heading')
      .find('a')
      .each(function(i, elem) {
        const article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: $(this).attr('href')
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  techTechCrunch: techTechCrunch,
  techTNW: techTNW,
  techReadWrite: techReadWrite,
  techBI: techBI
};
