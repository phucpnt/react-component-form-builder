const path = require('path');
const env = process.env;

const isUseReact = env.USE_REACT;

module.exports = {
  devtool: 'source-map',
  entry: `${__dirname  }/index.js`,
  output: {
    path: path.join(__dirname, './docs/dist'),
    filename: '[name]-bundle.js',
  },
  resolve: {
    alias: isUseReact ? {
      'react-native': 'p-react-native-web',
    } : {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      'react-native': 'p-react-native-web',
    },
  },
  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread'],
      },
    }, {
      test: /\.css$/,
      use: [
        'to-string-loader',
        'css-loader',
      ],
    }, {
      test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg)$/,
      use: [
        { loader: 'file-loader', options: { name: '[path][name].[ext]' } },
      ],
    }],
  },
};
