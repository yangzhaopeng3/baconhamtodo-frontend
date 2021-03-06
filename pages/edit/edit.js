// pages/edit/edit.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(options);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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
    properties: {
      tid: Number
    },
    data: {
      input_title: String,
      input_detail: String,
      date: Date,
      dialogShow: false,
      buttons: [{
        text: '取消'
      }, {
        text: '确定'
      }],
      index: 0,
      categoryList: []
    },
    methods: {
      onLoad() {
        let that = this;
        var selected_cid;
        //console.log(this.data.tid);
        wx.request({
          url: 'http://127.0.0.1:8080/todo/' + this.data.tid,
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          success(res) {
            let todo = res.data.data[0];
            console.log(todo.date);
            console.log(new Date(todo.date));
            selected_cid = todo.cid;
            that.setData({
              input_title: todo.title,
              input_detail: todo.detail,
              date: todo.date
            });
          }
        });
        wx.request({
          url: 'http://127.0.0.1:8080/category/' + getApp().globalData.uid,
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
          },
          success(res) {
            let list = res.data.data;
            console.log("selected cid :" + selected_cid);
            for (let i = 0; i < list.length; i++) {
              //console.log(list)
              if (list[i].cid == selected_cid) {
                //console.log(selected_cid);
                that.setData({
                  index: i
                });
              }
              let zhuijia = {
                cid: list[i].cid,
                cname: list[i].cname
              }
              that.data.categoryList.unshift(zhuijia);
            }
            that.setData({
              categoryList: that.data.categoryList
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
            url: 'http://127.0.0.1:8080/todo',
            method: "DELETE",
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Cookie': getApp().globalData.sessionId
            },
            data: {
              tid: this.data.tid
            },
            success(res) {
              wx.showToast({
                title: res.data.msg,
                duration: 2000,
                success: function() {
                  setTimeout(function() {
                    wx.switchTab({
                      url: '../list/list',
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
      submitForm: function(e) {
        //console.log(e.detail.value);
        let update_todo = e.detail.value;
        //console.log(update_todo)
        //console.log(this.data.categoryList[this.data.index].cid)
        wx.request({
          url: 'http://127.0.0.1:8080/todo',
          method: "PUT",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
            tid: this.data.tid,
            title: update_todo.title,
            date: new Date(this.data.date.replace("-", "/")),
            detail: update_todo.detail,
            cid: this.data.categoryList.length==0?0:this.data.categoryList[this.data.index].cid
          },
          success(res) {
            wx.showToast({
              title: res.data.msg,
              duration: 2000,
              success: function() {}
            })
          }
        })
      },
      deleteTodo: function(e) {
        this.setData({
          dialogShow: true
        })
      },
      bindDateChange: function(e) {
        //console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
      },
      bindCategoryChange: function(e) {
        this.setData({
          index: e.detail.value
        });
        //console.log(e.target.dataset.cid);
      },
    },
    /*组件所在页面的生命周期 */
    pageLifetimes: {
      show: function() {},
      hide: function() {},
      resize: function(size) {}
    }
  })