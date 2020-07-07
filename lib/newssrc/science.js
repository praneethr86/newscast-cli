"use strict";
const cheerio = require("cheerio");
const https = require("https");
const axios = require("axios");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

function sciSciAmerican(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $("h2.t_listing-title")
      .find("a")
      .each(function (i, elem) {
        const article = {
          heading: $(this).text(),
          link: $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function sciPopScience(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $(".headline")
      .find("a")
      .each(function (i, elem) {
        const article = {
          heading: $(this).text(),
          link: "https://www.popsci.com" + $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function sciEmptyYourCup(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $(".post-preview-wrap")
      .find("a.post-preview-title.newsletter:first-child")
      .each(function (i, elem) {
        const article = {
          heading: $(this).text(),
          link: $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  sciSciAmerican: sciSciAmerican,
  sciPopScience: sciPopScience,
  sciEmptyYourCup: sciEmptyYourCup,
};
