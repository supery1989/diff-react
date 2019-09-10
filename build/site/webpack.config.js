const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// TODO 生产环境使用该插件分离
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  //模式:开发模式
  mode:"development",
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'webpack-dev-server/client?http://localhost:9001',
    // 'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.join(__dirname, '../../site/index.tsx')
  ], //入口
  output: { //出口
      filename: '[hash].bundle.js',
      path: path.resolve(__dirname, '../../dist'),
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
          // MiniCssExtractPlugin.loader,
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
          // MiniCssExtractPlugin.loader,
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
        loader: 'url-loader',
        options: {
          limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
          fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
          name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
          outputPath: 'public/images/', // 输出路径
          publicPath: ''  // 可访问到图片的引用路径(相对/绝对)
        }
      }
    ]
  },
  devServer: {
    //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
    contentBase: path.resolve(__dirname, "dist"),
    compress:true, //是否压缩
    port:9001, //端口号
    hot: true,
    // host:'0.0.0.0', //外部服务器可以访问
    open:false //是否运行时打开浏览器
  },
  resolve: {
    extensions: ['.js','.jsx','.tsx'],
    alias: {
      'libs': path.resolve(__dirname, "../../libs"),
      'components': path.resolve(__dirname, "../../components")
    },
  },
  plugins: [
    //该插件将为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包
    //安装npm install --save-dev html-webpack-plugin
     new HtmlWebpackPlugin({
       title: '标题',//用于生成的HTML文档的标题
       template: '../../site/index.html', //默认index.html位置
       favicon: '../../site/assets/favicon.ico' //favicon.ico文件路径
     }),
    //  new MiniCssExtractPlugin({
    //   filename: 'public/css/[name].[contenthash].css',
    //   chunkFilename: 'public/css/[id].[contenthash].css',
    //   disable: true
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}