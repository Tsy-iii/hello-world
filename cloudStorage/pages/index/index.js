//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrl: "",
    videoUrl: ""
  },
  //下载并打开excel文件
  openexcel() {
    wx.cloud.downloadFile({
      fileID: 'a7xzcb'
    }).then(res => {
      wx.openDocument({
        filePath: res.tempFilePath,
        success: function (res) {
          console.log('打开文档成功')
        }
      })
    }).catch(error => {
      // handle error
    })
    
  },
  //上传excel文件
  uploadExcel() {
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles //一切以小程序官方文档为准
        wx.cloud.uploadFile({
          cloudPath: 'excel.xlsx', // 上传至云端的路径
          filePath: res.tempFile[0].path, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log("上传excel成功", res)
          },
          fail: console.error
        })
      }
    })
  },
  //上传图片
  upload() {
    let that = this;
    console.log("点击了上传图片")
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("选择成功", res)
        that.uploadImg(res.tempFilePaths[0])
      }
    })
  },
  uploadImg(fileUrl) {
    wx.cloud.uploadFile({
      //时间戳，把图片的名字变活，不写死，写死图片再次上传无法更新！
      cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
      filePath: fileUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功", res)
        this.setData({
          imgUrl: res.fileID
        })
      },
      fail: console.error
    })
  },
  //上传视频
  uploadVideo() {
    console.log("点击了上传视频")
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 600, //视频，单位秒
      camera: 'back',
      success(res) {
        console.log("选择视频成功", res.tempFilePath)
        wx.cloud.uploadFile({
          cloudPath: '视频.mp4', // 上传至云端的路径
          filePath: res.tempFilePath, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log("上传视频成功", res)
          },
          fail: console.error
        })
      }
    })
  }
})