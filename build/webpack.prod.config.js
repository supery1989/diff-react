const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  //模式:生产模式
  mode:"production",
  devtool: 'hidden-source-map',
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, '../site/index.tsx')
  ], //入口
  output: { //出口
      filename: '[hash].bundle.js',
      path: path.resolve(__dirname, '../dist'),
      // publicPath: '../dist'
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: 'public/common',
          chunks: 'all',
          // kb这个体积是压缩之前
          minSize: 30,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: 'public/vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
        }
      }
    }
  },
  module:{
    rules: [
      {
        test: /\.tsx$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        // 匹配scss
        test: /\.scss$/,
        exclude: [/node_modules/],
        // include: path.resolve(__dirname, '../site'),
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')('last 100 versions')]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.md$/,
        loader : 'raw-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.+)?$/,
        loader : 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif)(\?.+)?$/,
        loader : 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js','.jsx','.tsx'],
    alias: {
      'libs': path.resolve(__dirname, "../libs"),
      'components': path.resolve(__dirname, "../components")
    },
  },
  plugins: [
    // 删除dist目录
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), // 根目录
      verbose: true, // 开启在控制台输出信息
      // Default: false - remove files
      dry: false
    }),
    //该插件将为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包
    //安装npm install --save-dev html-webpack-plugin
    new HtmlWebpackPlugin({
      title: '标题',//用于生成的HTML文档的标题
      template: '../site/index.html', //默认index.html位置
      favicon: '../site/assets/favicon.ico' //favicon.ico文件路径
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      // 引入cssnano配置压缩选项
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      // 是否将插件信息打印到控制台
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: 'public/css/[name].[contenthash].css',
      chunkFilename: 'public/css/[id].[contenthash].css',
      disable: true
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}