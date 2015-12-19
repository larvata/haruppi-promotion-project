import fs from 'fs';
import moment from 'moment';
import path from 'path';


var args = process.argv.slice(2);
if (args.length !== 2) {
  console.log("argument length incorrect");
}
else{
  var m = moment(args[0],'YYYY-MM-DD');
  var days = parseInt(args[1]);


  var dateList = []
  for(var i=0; i<days; i++){
    var dest = path.join(__dirname,'upcoming',m.format('YYYY-MM-DD'))
    dateList.push(dest);
    m.add(1, 'day');
  }

  var output='<p><strong><span style="font-size: 14px;">今日动态</span></strong></p><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li><p><span style="font-size: 14px;">item1</span></p></li><li><p><span style="font-size: 14px;">item2<br/></span></p></li></ul><p><br></p><p><strong><span style="font-size: 14px;">近期出演/活动(北京时间)</span></strong></p><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li><p><span style="font-size: 14px;">item1</span></p></li><li> <p><span style="font-size: 14px;">item2</span></p></li></ul><p><span style="font-size: 14px;"><br/></span></p><p><strong><span style="font-size: 14px;">SNS更新</span></strong></p>';
  dateList.forEach(p=>{
    var fileData = fs.readFileSync(path.join(p,'plain.txt'));
    output += fileData;
    output += '<p><br></p>'
  })

  output +='<p><span style="font-size: 14px;"><br/></span></p><p>  <strong><span style="font-size: 14px;">成员互动</span></strong></p><p><span style="font-size: 14px;"><br></span></p><p><br/></p><p><strong><span style="font-size: 14px;">公众号自动回复指令说明</span></strong></p><ul class=" list-paddingleft-2" style="list-style-type: disc;"><li><p><span style="font-size: 14px;">?/help/帮助: 指令说明</span></p></li><li><p><span style="font-size: 14px;">ev/live/直播: 48系番组直播间节目表</span></p></li><li><p><span style="font-size: 14px;">perf/公演: 当日HKT48公演信息</span></p></li><li><p><span style="font-size: 14px;">hkt/开踢: HKT48冷知识</span></p></li><li><p><span style="font-size: 14px;">haruppi/儿玉遥: 兒玉遥迷你档案</span></p></li><li><p><span style="font-size: 14px;">任何建议请直接留言😝</span></p></li></ul><hr/><p><span style="font-size: 14px;">翻译: @迈克肉丝 @根基挡炎爆 @Nakateru</span></p><p><span style="font-size: 14px;">部分内容摘自微博 @2ch儿玉遥应援串</span></p><p><span style="font-size: 14px;">网盘资源: http://pan.baidu.com/s/1i3s4LTz</span></p><p><span style="font-size: 14px;">应援微博: @儿玉遥应援会</span></p><p><span style="font-size: 14px;">百度儿玉遥吧</span></p><p><span style="font-size: 14px;">应援Q群: 285383195</span></p><p>'

  output = `var date=new Date();y=date.getFullYear();m=date.getMonth()+1;d=date.getDate();var title=y+'.'+(m>9?m:'0'+m)+'.'+(d>9?d:'0'+d);$('input.js_title').val(title);UE.instants.ueditorInstant0.setContent('${output}')`

  fs.writeFileSync('./fullScript.txt',output);





}

