const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    // match the output path
    static: {
      // not really sure about this section for webpack 5
      publicPath: 'build',

      directory: path.resolve(__dirname, 'client'), // localhost 8080 assets are here
    },
    // enable HMR on the devServer
    hot: true,
    open: true,
    // fallback to root for other urls
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  //   pragma: 'dom', // default pragma is React.createElement (only in classic runtime)
                  //   pragmaFrag: 'DomFrag', // default is React.Fragment (only in classic runtime)
                  //   throwIfNamespace: false, // defaults to true
                  runtime: 'classic', // defaults to classic
                  // "importSource": "custom-jsx-library" // defaults to react (only in automatic runtime)
                },
                '@babel/preset-env',
              ],
            ],
          },
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: 'url-loader',
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};
