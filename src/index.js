//通过ES6语法引入jquery模块
import $ from 'jquery'
//需要指定的加载器处理
import '../css/index.css'
import '../css/index.less'
// 实现隔行换色
$(function () {
  $('li:odd').css('backgroundColor', 'red') //基数行为红色
  $('li:even').css('backgroundColor', 'blue') //偶数行为蓝色
})

class Person {
  //通过staic关键字，为Person类定义了一个静态地址 info
  //webpack无法打包处理“静态属性”这个高级语法
  static info = 'person info'
}
console.log(Person.info)
