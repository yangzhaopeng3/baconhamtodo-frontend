// pages/login/login.js
Page({
    /**
     * 页面的初始数据
     */
    data: {},
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
      username: "",
      password: ""
    },
    methods: {
      inputUsername: function(e) {
        this.setData({
          username: e.detail.value
        });
      },
      inputPassword: function(e) {
        this.setData({
          password: e.detail.value
        });
      },
      submitForm: function(e) {
        var username = this.data.username;
        var password = this.data.password;
        var reg_usrn = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
        var reg_psw = /^[a-zA-Z0-9]{6,10}$/;
        if (!reg_usrn.test(username)) {
          wx.showModal({
            content: '用户名输入不合法',
            showCancel: false
          });
          return;
        }
        if (!reg_psw.test(password)) {
          wx.showModal({
            content: '密码不能含有非法字符，长度在6-10之间',
            showCancel: false
          });
          return;
        }
        wx.request({
          url: 'http://127.0.0.1:8080/user/login',
          data: {
            username: username,
            password: password
          },
          success(res) {
            let code = res.data.code;
            let msg = res.data.msg;
            if (code === 0) {
              getApp().globalData.uid = res.data.data.uid;
              wx.showToast({
                title: msg,
                duration: 2000,
                success: function() {
                  setTimeout(function() {
                    wx.switchTab({
                      url: '../list/list'
                    })
                  }, 2000)
                }
              })
            } else if (code === 1) {
              wx.showModal({
                content: msg,
                confirmText: '去注册',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../register/register',
                      success(res) {}
                    });
                  }
                }
              })
            } else if (code === 2) {
              wx.showModal({
                content: msg,
                showCancel: false
              })
            }
          },
          fail(res) {}
        })
      },
      goRegister: function(e) {
        wx.navigateTo({
          url: '../register/register',
          success(res) {}
        });
      }
    }
  })