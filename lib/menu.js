"use strict";

const inquirer = require("inquirer");
const list = require("./list");

const questions_categories = [
  {
    type: "list",
    name: "category",
    message: "Select a category",
    choices: [
      {
        name: "Editorials",
        value: "eds",
      },
      {
        name: "Magazines",
        value: "magz",
      },
      {
        name: "Sports",
        value: "sports",
      },
      {
        name: "Tech",
        value: "tech",
      },
      {
        name: "Science",
        value: "science",
      },
    ],
  },
];

const questions_editorials = [
  {
    type: "list",
    name: "source",
    message: "Editorials/Columns: Select a source ",
    choices: [
      {
        name: "The Hindu",
        value: "hindu",
      },
      {
        name: "The Hindu lead Opinion",
        value: "hindulead",
      },
      {
        name: "Economic Times",
        value: "et",
      },
      {
        name: "Business Standard",
        value: "bs",
      },
      {
        name: "Indian Express",
        value: "ie",
      },
      {
        name: "Indian Express Columns",
        value: "iecolumns",
      },
      {
        name: "Hindu Business Line",
        value: "hbl",
      },
      {
        name: "Guardian",
        value: "guardian",
      },
      {
        name: "Live Mint",
        value: "livemint",
      },
    ],
  },
];

const questions_magazines = [
  {
    type: "list",
    name: "source",
    message: "Magazines: Select a source ",
    choices: [
      {
        name: "The Economist",
        value: "economist",
      },
      {
        name: "Project Syndicate",
        value: "projsyn",
      },
      {
        name: "Harvard Business Review",
        value: "hbr",
      },
      {
        name: "World Economic Forum",
        value: "wef",
      },
      {
        name: "The Atlantic",
        value: "atlantic",
      },
      {
        name: "Frontline",
        value: "frontline",
      },
      {
        name: "LongReads",
        value: "longreads",
      },
      {
        name: "Outlook",
        value: "outlook",
      },
      {
        name: "The Hindu Explains",
        value: "hinduexpl",
      },
    ],
  },
];

const questions_tech = [
  {
    type: "list",
    name: "source",
    message: "Technology: Select a source ",
    choices: [
      {
        name: "TechCrunch",
        value: "techcrunch",
      },
      {
        name: "The Next Web",
        value: "tnw",
      },
      {
        name: "Business Insider",
        value: "bi",
      },
    ],
  },
];

const questions_sports = [
  {
    type: "list",
    name: "source",
    message: "Sports: Select a source ",
    choices: [
      {
        name: "ESPN F1",
        value: "espnf1",
      },
      {
        name: "Auto F1",
        value: "autof1",
      },
      {
        name: "Premier League",
        value: "epl",
      },
    ],
  },
];

const questions_science = [
  {
    type: "list",
    name: "source",
    message: "Science: Select a source ",
    choices: [
      {
        name: "Scientific American",
        value: "sciam",
      },
      {
        name: "Popular Science",
        value: "popsci",
      },
      {
        name: "Empty Your Cup",
        value: "eyc",
      },
    ],
  },
];

function mainMenu() {
  inquirer.prompt(questions_categories).then((answers) => {
    if (answers.category == "eds") {
      inquirer.prompt(questions_editorials).then((answers) => {
        list("eds", {
          value: answers.source,
        });
      });
    } else if (answers.category == "magz") {
      inquirer.prompt(questions_magazines).then((answers) => {
        list("magz", {
          value: answers.source,
        });
      });
    } else if (answers.category == "sports") {
      inquirer.prompt(questions_sports).then((answers) => {
        list("sports", {
          value: answers.source,
        });
      });
    } else if (answers.category == "tech") {
      inquirer.prompt(questions_tech).then((answers) => {
        list("tech", {
          value: answers.source,
        });
      });
    } else if (answers.category == "science") {
      inquirer.prompt(questions_science).then((answers) => {
        list("science", {
          value: answers.source,
        });
      });
    }
  });
}

module.exports = {
  mainMenu: mainMenu,
};
