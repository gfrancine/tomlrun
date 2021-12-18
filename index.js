#!/usr/bin/env node

const toml = require("toml");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const FILE = "scripts.toml";
const HELP = "USAGE: tomlrun <script> [...args]";

function eprint(message) {
  console.error(message);
  process.exit(1);
}

if (process.argv.length < 3) eprint(HELP);

let scriptsFile;
try {
  scriptsFile = fs.readFileSync(FILE, { encoding: "utf8" });
} catch (e) {
  eprint(`Error reading ${FILE}: \n${e}`);
}

let scripts;
try {
  scripts = toml.parse(scriptsFile);
} catch (e) {
  eprint(`Error parsing ${FILE} on line ${e.line} column ${e.column}: \n${e}`);
}

const scriptName = process.argv[2];
const script = scripts[scriptName];
if (script === undefined) eprint(`No script named "${scriptName}"`);
if (typeof script !== "string") eprint(`Script ${scriptName} is not a string`);

const paths = process.env.PATH.split(path.delimiter);
paths.push(path.join(process.cwd(), "node_modules", ".bin"));

const ls = spawn(script, process.argv.slice(3), {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    PATH: paths.join(path.delimiter),
  },
});

ls.on("exit", (code) => process.exit(code));
