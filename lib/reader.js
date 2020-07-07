"use strict";

const cheerio = require("cheerio");
const htmlToText = require("html-to-text");
const spawn = require("child_process").spawn;
const https = require("https");
const axios = require("axios");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

function getTextFromHtml(html) {
  return htmlToText.fromString(html, {
    ignoreImage: true,
    preserveNewlines: true,
    uppercaseHeadings: true,
    singleNewLineParagraphs: true,
  });
}

function printArticle(content) {
  const show_content = spawn(`cat <<< "${content}" | less -r`, {
    stdio: "inherit",
    shell: true,
  });
  show_content.on("exit", (code) => {
    module.parent.parent.exports.mainMenu();
  });
}

function parseContent(options) {
  const $ = cheerio.load(options.html);
  let articleMarkup = {};
  if (options.modifier === "eds") {
    articleMarkup = readerEditorials($, options.website);
  } else if (options.modifier === "magz") {
    articleMarkup = readerMagazines($, options.website);
  } else if (options.modifier === "sports") {
    articleMarkup = readerSports($, options.website);
  } else if (options.modifier === "science") {
    articleMarkup = readerScience($, options.website);
  } else if (options.modifier === "tech") {
    articleMarkup = readerTech($, options.website);
  }
  return getTextFromHtml(articleMarkup);
}

function readerScience($, website) {
  let articleMarkup = {};
  if (website === "sciam") {
    articleMarkup = $("div.mura-region-local").find("p").text();
  } else if (website === "popsci") {
    articleMarkup = $("#article-body").find("p").text();
  } else if (website === "eyc") {
    articleMarkup = $("div.body.markup").find("p").text();
  }
  return articleMarkup;
}

function readerTech($, website) {
  let articleMarkup = {};
  if (website === "techcrunch") {
    articleMarkup = $("div.article-content").find("p").text();
  } else if (website === "tnw") {
    articleMarkup = $("div.c-post-content").find("p").text();
  } else if (website === "bi") {
    articleMarkup = $("div.Normal").text();
  }
  return articleMarkup;
}

function readerSports($, website) {
  let articleMarkup = {};
  if (website == "espnf1") {
    articleMarkup = $("div.article-body").find("p").text();
  } else if (website === "autof1") {
    articleMarkup = $("div.content").find("p").text();
  } else if (website === "epl") {
    articleMarkup = $(".standardArticle").find("p").text();
  }
  return articleMarkup;
}

function readerEditorials($, website) {
  let articleMarkup = {};
  if (website === "hindu" || website === "et") {
    articleMarkup = $(".article").find("p").text();
  } else if (website === "hindulead") {
    articleMarkup = $(".article").find("p").text();
  } else if (website === "ie" || website === "iecolumns") {
    articleMarkup = $("div.full-details").find("p").text();
  } else if (website === "hbl") {
    articleMarkup = $(".contentbody").find("p").text();
  } else if (website === "guardian") {
    articleMarkup = $("div.content__article-body").find("p").text();
  } else if (website === "livemint") {
    articleMarkup = $("div.mainArea").find("p").text();
  }
  return articleMarkup;
}

function readerMagazines($, website) {
  let articleMarkup = {};
  if (website === "projsyn") {
    articleMarkup = $(".article__body").find("p").text();
  } else if (website === "economist") {
    articleMarkup = $(".article__body-text").text();
  } else if (website === "hbr") {
    articleMarkup = $(".article").find("p").text();
  } else if (website === "wef") {
    articleMarkup = $(".article-body").find("p").text();
  } else if (website === "atlantic") {
    articleMarkup = $(".l-article__section").find("p").text();
  } else if (website === "newyorker") {
    articleMarkup = $("div.SectionBreak").find("p").text();
  } else if (website === "frontline") {
    articleMarkup = $(".body-main").find("p").text();
  } else if (website === "longreads") {
    articleMarkup = $(".entry-content").find("p").text();
  } else if (website === "outlook") {
    articleMarkup = $(".story_description").find("p").text();
  } else if (website === "hinduexplains") {
    articleMarkup = $(".article").find("span").text();
  }
  return articleMarkup;
}

function show(options) {
  axios.get(options.url, { httpsAgent: agent }).then(
    (response) => {
      const content = parseContent({
        html: response.data,
        modifier: options.modifier,
        website: options.website,
      });
      printArticle(content);
    },
    function () {
      console.log("Oops! Something went wrong!");
    }
  );
}

module.exports = {
  show: show,
};
