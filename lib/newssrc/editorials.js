"use strict";
const cheerio = require("cheerio");
const https = require("https");
const axios = require("axios");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

function edsHindu(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $(".100_4x_2EditorialStories")
      .find("h2")
      .find("a")
      .each(function (i, elem) {
        const article = {
          heading: $(this).text().replace(/\n/g, ""),
          link: $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsHinduLead(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $("div.story-card-news")
      .find("h3")
      .find("a")
      .each(function (i, elem) {
        const article = {
          heading: $(this).text().replace(/\n/g, ""),
          link: $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsET(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $("div.content")
      .find("a")
      .each(function (i, elem) {
        const article = {
          heading: $(this).attr("title"),
          link: $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsBizStandard(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    const link_prefix = "https://www.business-standard.com";
    $(".main-cont-left")
      .find("a")
      .each(function (i, elem) {
        const article = {
          heading: $(this).text(),
          link: link_prefix + $(this).attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

function edsHBL(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $("article.editorial")
      .find("a:first-child")
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

//Same function works for both IE editorials and IE columnists
function edsIndExp(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $("div.profile-container")
      .find("h2")
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

function edsGuardian(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $(".fc-item__content").each(function (i, elem) {
      if (i > 3) {
        return false;
      }
      const article = {
        heading: $(this)
          .find("a")
          .text()
          .replace(/\n/g, "")
          .replace("The Guardian view on ", ""),
        link: $(this).find("a").attr("href"),
      };
      articles[i] = article;
    });
    cb(articles);
  });
}

function edsLivemint(url, cb) {
  axios.get(url, { httpsAgent: agent }).then((response) => {
    const $ = cheerio.load(response.data);
    const articles = [];
    $(".linkclick-candidate")
      .find($(".headline"))
      .each(function (i, elem) {
        const article = {
          heading: $(this)
            .find("a")
            .text()
            .replace(/Opinion \| /g, ""),
          link: $(this).find("a").attr("href"),
        };
        articles[i] = article;
      });
    cb(articles);
  });
}

module.exports = {
  edsHindu: edsHindu,
  edsHinduLead: edsHinduLead,
  edsBizStandard: edsBizStandard,
  edsET: edsET,
  edsIE: edsIndExp,
  edsHBL: edsHBL,
  edsGuardian: edsGuardian,
  edsLivemint: edsLivemint,
};
