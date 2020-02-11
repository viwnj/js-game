const clearConsole = require('react-dev-utils/clearConsole');
const chalk = require('react-dev-utils/chalk');
const formatWebpackMessages = require('./formatWebpackMessages');

function printCompiledSuccesfullyMessage(appName, host, port, useYarn) {
  console.log(
    chalk.cyan('You can now view your app at:\n\n '),
    chalk.bold(chalk.white(`http://${host}/${port}`))
  );
  console.log();
  console.log('Note that the development build is not optimized.');
  console.log(
    `To create a production build, use ` +
      `${chalk.cyan(`${useYarn ? 'yarn' : 'npm run'} build`)}.`
  );
  console.log();
}

function createCompiler({
  appName,
  config,
  port,
  host,
  webpack,
  useYarn = false,
}) {
  const isInteractive = process.stdout.isTTY;

  // "Compiler" is a low-level interface to Webpack.
  // It lets us listen to some events and provide our own custom messages.
  let compiler;
  try {
    compiler = webpack(config);
  } catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
  }

  // "invalid" event fires when you have changed a file, and Webpack is
  // recompiling a bundle.
  compiler.hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole();
    }
    console.log('Compiling...');
  });

  let isFirstCompile = true;

  // "done" event fires when Webpack has finished recompiling the bundle.
  compiler.hooks.done.tap('done', async stats => {
    if (isInteractive) {
      clearConsole();
    }

    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    });

    const messages = formatWebpackMessages(statsData);
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      console.log(chalk.green('Compiled successfully ᗒ ᗨ ᗕ)! uwu ')); // (
    }
    if (isSuccessful && (isInteractive || isFirstCompile)) {
      printCompiledSuccesfullyMessage(appName, host, port, useYarn);
    }
    isFirstCompile = false;

    // If errors exist, only show errors.
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      console.log(
        chalk.red(
          'Failed to compile, please fix before conitnuing... (◕︿◕✿)\n'
        )
      );
      console.log(messages.errors.join('\n\n'));
      return;
    }

    // Show warnings if no errors were found.
    if (messages.warnings.length) {
      console.log(
        chalk.yellow(
          'Compiled with warnings please fix before continuing... (◕︿◕✿)\n'
        )
      );
      console.log(messages.warnings.join('\n\n'));

      // Teach some ESLint tricks.
      console.log(
        `\nSearch for the ${chalk.underline(
          chalk.yellow('keywords')
        )} to learn more about each warning.`
      );
      console.log(
        `To ignore, add ${chalk.cyan(
          '// eslint-disable-next-line'
        )} to the line before.\n`
      );
    }
  });

  return compiler;
}

module.exports = {
  createCompiler,
};
