# newscast-cli

**newcast-cli** is a work-in-progress project and will be upgraded every day

It's boring to go to a ton of websites to read your favorite news. Of course there are tools like feedly (I so miss Google Reader!) to get it on the browser.
But I am a command-line addict and it just made sense to build a CLI for my daily news feeds.

# Options

| News Topic | Modifier  | Value                                                                       | Description                                                                                                             |
| ---------- | --------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Editorials | `eds`     | `hindu`, `hindulead` `et`, `ie`, `iecolumns`, `hbl`, `guardian`, `livemint` | Hindu, HinduLead Editorial, Economic Times, IndianExpress, IndianExpress Columns, HinduBusinessLine, Guardian, LiveMint |
| Sports     | `sports`  | `espnf1`, `autof1`, `epl`                                                   | ESPNF1, AutoSport F1, English Premier League                                                                            |
| Magazines  | `magz`    | `economist`, `projsyn`, `hbr`,`atlantic`, `frontline`                       | The Economist, Project Syndicate, HarvardBusinessReview, TheAtlantic, Frontline                                         |
| Science    | `science` | `sciam`, `popsci`                                                           | ScientificAmerican, PopularScience                                                                                      |
| Tech News  | `tech`    | `techcrunch`, `tnw`                                                         | TechCrunch, TheNextWeb                                                                                                  |

# Usage

Some examples of how to run the tool:

- Read editorials - `node index eds hindu`
- Read sports - `node index sports autof1`
- Read magazines - `node index magz economist`
- Read science news - `node index science sciam`
- Read Tech news - `node index tech techcrunch`

# How to add a news source

- Add to index.js if you want new mode (eds, sports, etc.) and add parameter(topic, source, sport etc.)
- Add website URL to consts.js
- Add entry in post.js to call to fetch posts
- Add file/function in newssrc folder (in relevant file) to scrape posts
- Add to reader.js to scrape the posts content

# Thanks

Inspiration from [medium-cli](https://github.com/djadmin/medium-cli)
