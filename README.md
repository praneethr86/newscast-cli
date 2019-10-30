# newscast-cli

**newcast-cli** is a work-in-progress project and will be upgraded every day

This is where I read my news everyday now.
Visiting a ton of websites is tedious. Reading on RSS feeds still keeps me on the browser and I end up visiting unwanted sites anyway.
Command line is the answer to all my problems. So this CLI will help me read all my news, on the terminal, on a distraction free screen and let me focus on what news is important for me.

# Options

| News Topic | Modifier  | Value                                                                                      | Description                                                                                                             |
| ---------- | --------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Editorials | `eds`     | `hindu`, `hindulead` `et`, `ie`, `iecolumns`, `hbl`, `guardian`, `livemint`                | Hindu, HinduLead Editorial, Economic Times, IndianExpress, IndianExpress Columns, HinduBusinessLine, Guardian, LiveMint |
| Sports     | `sports`  | `espnf1`, `autof1`, `epl`                                                                  | ESPNF1, AutoSport F1, English Premier League                                                                            |
| Magazines  | `magz`    | `economist`, `projsyn`, `hbr`,`atlantic`, `frontline`, `longreads`, `outlook`, `hinduexpl` | The Economist, Project Syndicate, HarvardBusinessReview, TheAtlantic, Frontline, LongReads, Outlook, TheHinduExplains   |
| Science    | `science` | `sciam`, `popsci`                                                                          | ScientificAmerican, PopularScience                                                                                      |
| Tech News  | `tech`    | `techcrunch`, `tnw` , `readwrite`                                                          | TechCrunch, TheNextWeb, ReadWrite                                                                                       |

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
