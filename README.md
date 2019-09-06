# newscast-cli

**newcast-cli** is a work-in-progress project and will be upgraded every day

It's boring to go to a ton of websites to read your favorite news. Of course there are tools like feedly (I so miss Google Reader!) to get it on the browser.
But I am a command-line addict and it just made sense to build a CLI for my daily news feeds.

# Options

| News Topic | Modifier | Value                                    | Description                                                          |
| ---------- | -------- | ---------------------------------------- | -------------------------------------------------------------------- |
| Editorials | `eds`    | `hindu`, `et`, `ie`, `hbl`, `guardian`   | Hindu, Economic Times, IndianExpress, HinduBusinessLine, Guardian    |
| Sports     | `sports` | `f1`, `epl`                              | Formula1, English Premier League                                     |
| Magazines  | `magz`   | `economist`, `projsyn`, `hbr`,`atlantic` | The Economist, Project Syndicate, HarvardBusinessReview, TheAtlantic |

# Usage

Some examples of how to run the tool:

- Read editorials - `node index eds hindu`
- Read sports - `node index sports f1`
- Read magazines - `node index magz economist`

# Thanks

Inspiration from [medium-cli](https://github.com/djadmin/medium-cli)
