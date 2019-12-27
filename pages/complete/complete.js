// pages/complete/complete.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log("load")
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
      console.log("ready")
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      console.log("show")
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
  }),
  Component({
    data: {
      todoList: []
    },
    methods: {
      checkboxChange: function(e) {
        var tid_checked;
        console.log(e.detail.value);
        var checked_list = e.detail.value;
        for (let i = 0; i < this.data.todoList.length; i++) {
          if (checked_list.indexOf(this.data.todoList[i].tid + "") == -1) {
            tid_checked = this.data.todoList[i].tid;
            this.data.todoList.splice(i, 1);
            break;
          }
        }
        console.log(tid_checked);
        wx.request({
          url: 'http://127.0.0.1:8080/todo',
          method: "PUT",
          data: {
            tid: tid_checked,
            is_done: 0
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          success(res) {
            console.log(res.data);
          }
        })
        this.setData({
          todoList: this.data.todoList
        });
        // var checked = Number(e.detail.value)
        // var changed = this.data.todoList;
        // for (var i = 0; i < this.data.todoList.length; i++) {
        //   if (this.data.todoList[i].tid === checked) {
        //     changed.splice(i, 1);
        //     break;
        //   }
        // }
        // wx.request({
        //   url: 'http://127.0.0.1:8080/todo',
        //   method: "PUT",
        //   data: {
        //     tid: checked
        //   },
        //   success(res) {
        //     console.log(res.data);
        //   }
        // })
        // this.setData({
        //   todoList: changed
        // })
      },
    },
    pageLifetimes: {
      show: function() {
        let that = this;
        wx.request({
          url: 'http://127.0.0.1:8080/todo',
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
            uid: getApp().globalData.uid,
            is_done: 1
          },
          success(res) {
            let list = res.data.data;
            for (let i = 0; i < list.length; i++) {
              let zhuijia = {
                tid: list[i].tid,
                title: list[i].title
              }
              that.data.todoList.unshift(zhuijia);
            }
            that.setData({
              todoList: that.data.todoList
            });
          }
        })
      },
      hide: function() {
        this.setData({
          todoList: []
        });
      },
      resize: function(size) {
        // 页面尺寸变化
        //console.log("页面尺寸变化")
      }
    }
  })