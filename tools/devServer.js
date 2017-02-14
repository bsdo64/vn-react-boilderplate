const WebpackDevServer  = require('webpack-dev-server');
const webpack  = require('webpack');
const config  = require('./webpack.config');
const chalk  = require('chalk');
const open = require('open');

console.log(chalk.blue('Starting WebpackDevServer debug'));

try {

  const compiler = webpack(config({isDev: true}));

  const server = new WebpackDevServer(compiler,{
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { colors: true, assets: false, source: false, timings: true, hash: false, version: false, chunkModules: false, chunkOrigins: true },
  });

  server.listen(3000,'0.0.0.0', () => {
    console.log(chalk.green('Listening on port 3000'));
    open('http://localhost:3000');
  });

} catch (ex) {
  console.log(chalk.red(`The following error has ocurred: ${ex}`));
}