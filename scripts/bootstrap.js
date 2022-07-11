/* eslint-disable @typescript-eslint/no-var-requires */
const ChildProcess = require('child_process');
const OS = require('os');
const Path = require('path');

const root = Path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

if (OS.type() === 'Windows_NT') {
  options.shell = true;
}

let result;

if (process.cwd() !== root || args.length) {
  // We're not in the root of the project, or additional arguments were passed
  // In this case, forward the command to `yarn`
  result = ChildProcess.spawnSync('yarn', args, options);
} else {
  // If `yarn` is run without arguments, perform bootstrap
  result = ChildProcess.spawnSync('yarn', ['bootstrap'], options);
}

process.exitCode = result.status;
