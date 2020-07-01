'use strict';
const cheerio = require('cheerio');
const https = require('https');
const axios = require('axios');
const agent = new https.Agent({  
  rejectUnauthorized: false
});

function magzEconomist(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.teaser')
      .find('a')
      .each(function(i, elem) {
        const linkExtension = $(this).attr('href');
        const article = {
          heading: $(this).attr('aria-label'),
          link: `https://www.economist.com` + linkExtension
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function magzAtlantic(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.article').each(function(i, elem) {
      const linkExtension = $(this)
        .find('a')
        .attr('href');
      const article = {
        heading: $(this)
          .find('a')
          .find('h2')
          .text()
          .trim()
          .replace(/\n/g, ''),
        link: `https://www.theatlantic.com` + linkExtension
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function magzProjSyndicate(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.listing__title')
      .find('a:first-child')
      .each(function(i, elem) {
        const linkExtension = $(this).attr('href');
        const article = {
          heading: $(this).text(),
          link: 'https://www.project-syndicate.org' + linkExtension
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function magzHBR(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('h3.hed')
      .find('a:first-child')
      .each(function(i, elem) {
        const linkExtension = $(this).attr('href');
        const article = {
          heading: $(this).text(),
          link: 'https://hbr.org' + linkExtension
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function magzFrontline(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('h2.bigtitle, h2.title')
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

function magzNewYorker(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('[class^="River__riverItemContent"]')
      .find('a')
      .has('h4')
      .each(function(i, elem) {
        const linkExtension = $(this).attr('href');
        const article = {
          heading: $(this).text(),
          link: 'https://www.newyorker.com' + linkExtension
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function magzLongReads(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('h1.entry-title')
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

function magzHinduExplains(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('.story-card-news')
      .find('h3')
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

function magzOutlook(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response)=> {
    const $ = cheerio.load(response.data);
    const articles = [];
    $('div.category_story_listing8')
      .find('h2, h5')
      .find('a')
      .each(function(i, elem) {
        const article = {
          heading: $(this)
            .text()
            .trim()
            .replace(/\n/g, ''),
          link: 'https://www.outlookindia.com' + $(this).attr('href')
        };

        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  magzEconomist: magzEconomist,
  magzProjSyndicate: magzProjSyndicate,
  magzHBR: magzHBR,
  magzAtlantic: magzAtlantic,
  magzNewYorker: magzNewYorker,
  magzFrontline: magzFrontline,
  magzLongReads: magzLongReads,
  magzOutlook: magzOutlook,
  magzHinduExplains: magzHinduExplains
};
