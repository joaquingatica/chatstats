# ChatStats

## Requirements

The only requirement is Deno 1.0 or above. Install by following the [official documentation](https://deno.land/#installation).

## Setup

After cloning the repository:
1. In your WhatsApp mobile app, from the chat screen, go to Options > More > Export chat

![Chat Options Menu](./docs/export-screenshot1.png "Chat Options Menu") ![Chat Options > More Menu](./docs/export-screenshot2.png "Chat Options > More Menu")
2. Place the exported `.txt` files in a folder in the project (i.e. `./data` folder).
1. Copy `config.sample.json` as `config.json` to the root of the project.
2. Update the configuration to match the desired data source folder and files, and the output file, for example:
```json
{
  "sourceFiles": [
    "./data/chat-export-part1.txt",
    "./data/chat-export-part2.txt"
  ],
  "outputPath": "./output/stats.json"
}
```

## Usage

1. Run `sh run start`.
2. Go to `http://localhost:8000` to see the stats in charts.

## Commands Reference

Commands have the following structure:

```bash
sh run <command>
```

Available commands:
* `start` to generate the stats and listen in port `8000` for web version.
* `fmt` to format code using [Prettier](https://prettier.io/) with the default settings.
* `test` to run the tests.
