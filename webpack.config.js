// 引入path模块
const path = require('path')
// 按需导入插件、得到插件的构造函数之后，创建插件的实例对象
// html插件的作用是能够复制一份打包好后的文件放在内存中
const HtmlPlugin = require('html-webpack-plugin')
// 引入清除dist目录中的webpack插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 实例化HtmlPlugin对象
const htmlPlugin = new HtmlPlugin({
  template: './src/index.html', //原文件的存放路径
  filename: './index.html' //指定生成文件的存放路径，放在项目的根目录上
})
// 实例化CleanWebpackPlugin对象
const cleanPlugin = new CleanWebpackPlugin()
module.exports = {
  // 定义打包的模式
  mode: 'development',
  // 打包文件的入口
  entry: path.join(__dirname, './src/index.js'),
  // 打包好后文件的出口
  output: {
    path: path.join(__dirname, './dist'),
    // 打包好的文件名字
    filename: 'js/bundles.js'
  },
  // eval-source-map仅限在“开发模式”下使用，不建议在“生产模型”下使用
  // 此选项生成的source map能够保证“运行时报错的行数”与“源代码的行数”保持一致
  // devtool: 'eval-source-map',
  //在生产环境下，只暴露行号，不暴露源码
  // devtool: 'nosources-source-map',
  // 暴露行号和源代码，非常危险，不使用
  devtool: 'source-map',
  //通过plugins节点，挂载对象，使插件生效
  plugins: [htmlPlugin, cleanPlugin],
  // 通过devserve节点配置webpack serve，需要重新启动服务才能生效
  devServer: {
    open: true, //是否自动打开浏览器
    host: '127.0.0.1', //主机号
    port: 8081 //端口号
  },
  module: {
    //所有第三方文件的匹配规则
    rules: [
      //文件后缀名的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //loader的顺序不能反，调用顺序是从后往前
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      // { test: /\.jpg|png|gif$/, use: 'url-loader?limit=22229' } //limit是否设置是否转为base64图片，能够更快加载图片
      {
        //url-loader的另一种配置方法
        test: /\.(jpg|png|gif)$/i,
        type: 'javascript/auto',
        use: {
          loader: 'url-loader',
          options: {
            limit: 22227,
            esModule: false,
            outputPath: 'image' //指定图片文件的输出路径
          }
        }
      },
      {
        test: /\.js$/,
        // exclude为排除项
        // 表示使用babel-loader只是为了处理开发者编写的js文件，不需要处理node_modules下的js文件
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // 声明一个babel插件，此插件用来转换class的高级语法
          options: { plugins: ['@babel/plugin-proposal-class-properties'] }
        }
      }
    ]
  }
}
