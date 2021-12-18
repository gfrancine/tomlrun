# tomlrun

A dead simple script runner with [TOML](https://toml.io/) as an alternative to package.json scripts.

TOML supports single-quote strings, multi-line strings, comments, and other features meant for more human configuration files. A script runner based on it would support longer commands better than a JSON one.

`tomlrun` also looks for commands in your `node_modules/.bin` directory the way `npm run` would.

## Install

Install it globally:

```sh
npm i -g tomlrun
```

Or install it in your package so you could add it to your `package.json`:

```sh
npm i -D tomlrun
```

## Usage

Have a `scripts.toml` file in your project's root directory:

```toml
# A simple command:
sayhello = "echo hello"

# A command in a multi-line string:
format = """prettier --write \
  **.js **.jsx \
  **.ts **.tsx \
  """
```

Run the script and optionally pass arguments into it: 

```sh
# tomlrun <script> [...args]
tomlrun sayhello world
```

```
hello world
```
