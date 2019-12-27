// pages/me/me.js
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
    data: {
      nickname: String,
      categoryList: []
    },
    methods: {
      submitForm: function(e) {
        this.submitToServer(e.detail.value.title);
      },
      submitCate: function(e) {
        this.submitToServer(e.detail.value);
      },
      submitToServer:function(cate){
        let that = this;
        wx.request({
          url: 'http://127.0.0.1:8080/category',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
            cname: cate,
            uid: getApp().globalData.uid,
          },
          success(res) {
            var cate = res.data.data;
            console.log(cate);
            var zhuijia = {
              cid: cate.cid,
              cname: cate.cname
            };
            that.data.categoryList.unshift(zhuijia);
            that.setData({
              categoryList: that.data.categoryList
            });
            that.setData({
              input_value: ""
            });
          }
        })
      },
      updateCategory:function(e){
        console.log(e.currentTarget.dataset.cid);
        wx.navigateTo({
          url: '../update_cate/update_cate?cid=' + e.currentTarget.dataset.cid,
        })
      }
    },
    pageLifetimes: {
      // 组件所在页面的生命周期函数
      show: function() {
        let that = this;
        that.setData({
          categoryList: []
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
            console.log(list);
            console.log(getApp().globalData.uid);
            console.log(list);
            for (let i = 0; i < list.length; i++) {
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
        this.setData({
          nickname: getApp().globalData.nickname
        });
      },
      hide: function() {},
      resize: function() {},
    }
  })