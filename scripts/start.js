const webpack = require('webpack');
const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('react-dev-utils/chalk');

const openBrowser = require('react-dev-utils/openBrowser');
const WebpackDevServer = require('webpack-dev-server');
const { createCompiler } = require('./utils/createWebPackCompiler');
const webpackConfig = require('./config/webpack.config');
const serverConfig = require('./config/serverConfig');
const appName = require('../package.json').name;

const isInteractive = process.stdout.isTTY;

const compiler = createCompiler({
  appName,
  config: webpackConfig,
  port: 3000,
  host: 'localhost',
  useYarn: true,
  webpack,
});

const devServer = new WebpackDevServer(compiler, serverConfig);

devServer.listen(3000, 'localhost', err => {
  if (err) return console.log(err);

  if (isInteractive) {
    clearConsole();
  }

  console.log(chalk.cyan('Starting the development server...uwu\n'));
  openBrowser('http://localhost:3000');
});
