// pages/update_cate/update_cate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
}),
Component({
  properties: {
    cid: Number
  },
  data: {
    input_title: String,
    dialogShow: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
  },
  methods: {
    onLoad() {
      let that = this;
      //console.log(this.data.tid);
      wx.request({
        url: 'http://127.0.0.1:8080/cate/' + this.data.cid,
        method: "GET",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': getApp().globalData.sessionId
        },
        success(res) {
          let category = res.data.data;
          that.setData({
            input_title: category.cname
          });
        }
      })
    },
    tapDialogButton(e) {
      let that = this;
      let choice = e.detail.index;
      if (choice == 0) {
        //cancel
      } else if (choice == 1) {
        //yes
        wx.request({
          url: 'http://127.0.0.1:8080/category',
          method: "DELETE",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
            cid: this.data.cid
          },
          success(res) {
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../me/me',
                  })
                }, 2000)
              }
            })
          }
        })
      }
      that.setData({
        dialogShow: false,
      })
    },
    submitForm: function (e) {
      //console.log(e.detail.value);
      let update_todo = e.detail.value;
      console.log(update_todo)
      wx.request({
        url: 'http://127.0.0.1:8080/category',
        method: "PUT",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Cookie': getApp().globalData.sessionId
        },
        data: {
          cid: this.data.cid,
          cname: update_todo.cname
        },
        success(res) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            success: function () { }
          })
        }
      })
    },
    deleteCategory: function (e) {
      this.setData({
        dialogShow: true
      })
    }
  },
  /*组件所在页面的生命周期 */
  pageLifetimes: {
    show: function () { },
    hide: function () { },
    resize: function (size) { }
  }
})