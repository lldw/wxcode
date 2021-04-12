// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  if (event.action == "dianzan") {
    return await db.collection("w_lookfor").doc(event.id).update({
      data: {
        dianzan: event.dianzan
      }
    }).then(res => {
      console.log("点赞更新成功", res);
      return res
    }).catch(res => {
      console.log("点赞更新失败", res);
      return res
    })
  } else if (event.action == "shoucang") {
    return await db.collection("w_lookfor").doc(event.id).update({
      data: {
        shoucang: event.shoucang
      }
    }).then(res => {
      console.log("收藏更新成功", res);
      return res
    }).catch(res => {
      console.log("收藏更新成功", res);
      return res
    })
  }
}