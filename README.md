# newscast-cli

**newcast-cli** is a work-in-progress project and will be upgraded every day

It's boring to go to a ton of websites to read your favorite news. Of course there are tools like feedly (I so miss Google Reader!) to get it on the browser.
But I am a command-line addict and it just made sense to build a CLI for my daily news feeds.

# Options

| News Topic | Modifier | Value                | Description                         |
| ---------- | -------- | -------------------- | ----------------------------------- |
| Editorials | `eds`    | `hindu`, `et`, `nyt` | Hindu, Economic Times, NewYorkTimes |
| Sports     | `sports` | `f1`, `epl`          | Formula1, English Premier League    |
| Medium     | `medium` | `TBD`                | To be added                         |

# Usage

Some examples of how to run the tool:

- Read editorials - `node index eds hindu` - `node index eds et`
- Read Sports - `node index sports f1`

# Thanks

Inspiration from [medium-cli](https://github.com/djadmin/medium-cli)
