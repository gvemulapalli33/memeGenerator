const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path');

module.exports = {
  "entry":  "./index",
  "output": {
     path: path.resolve(__dirname, 'dist'),
    "filename": "[name].js"
  },
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "babel-preset-env",
              "babel-preset-react"
            ]
          }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      },
      {
          test:  /\.html$/,
          use: { loader: "html-loader" }
      },
      {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
      },
      {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
              {
                  loader: 'file-loader',
                  options: {
                      outputPath: './resources/imgs',
                      name: '[name].[ext]'
                  }
              },
          ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
    })
],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true
  }
};