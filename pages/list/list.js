// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      //console.log("onshow")
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
      categoryList: [],
      todoList: [],
      inputValue: "",
      dialogShow: false,
      buttons: [{
        text: '取消'
      }, {
        text: '确定'
      }],
      del_tid: "",
      index: -1
    },
    methods: {
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
              tid: that.data.del_tid
            },
            success(res) {
              for (var i = 0; i < that.data.todoList.length; i++) {
                if (that.data.todoList[i].tid === that.data.del_tid) {
                  that.data.todoList.splice(i, 1);
                  break;
                }
              }
              that.setData({
                todoList: that.data.todoList
              });
            }
          })
        }
        this.setData({
          dialogShow: false,
        })
      },
      submitToServer: function(title) {
        var that = this;
        //console.log(title);
        wx.request({
          url: 'http://127.0.0.1:8080/todo',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
            title: title,
            uid: getApp().globalData.uid,
            date: new Date()
          },
          success(res) {
            var todo = res.data.data;
            console.log(todo);
            var zhuijia = {
              tid: todo.tid,
              title: todo.title
            };
            that.data.todoList.unshift(zhuijia);
            that.setData({
              todoList: that.data.todoList
            });
            that.setData({
              input_value: ""
            });
          }
        })
      },
      checkboxChange: function(e) {
        var checked = Number(e.detail.value)
        //console.log(checked)
        var changed = this.data.todoList;
        //console.log(changed);
        for (var i = 0; i < this.data.todoList.length; i++) {
          if (this.data.todoList[i].tid === checked) {
            changed.splice(i, 1);
            break;
          }
        }
        wx.request({
          url: 'http://127.0.0.1:8080/todo',
          method: "PUT",
          data: {
            tid: checked,
            is_done: 1
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          success(res) {
            //console.log(res.data);
          }
        })
        this.setData({
          todoList: changed
        })
      },
      submitToDo: function(e) {
        this.submitToServer(e.detail.value);
      },
      submitForm: function(e) {
        if (e.detail.value.title == '') {
          return;
        }
        this.submitToServer(e.detail.value.title);
      },
      slideButtonTap(e) {
        let choice = e.detail.index;
        let tid = e.currentTarget.dataset.tid;
        if (choice == 0) {
          //edit
          wx.navigateTo({
            url: '../edit/edit?tid=' + tid,
          })
        } else if (choice == 1) {
          //del
          this.setData({
            dialogShow: true,
            del_tid: tid
          })
        }
      },
      bindCategoryChange: function(e) {
        this.setData({
          index: e.detail.value,
          todoList:[]
        });
        let that = this;
        let cid = this.data.categoryList[e.detail.value].cid;
        wx.request({
          url: 'http://127.0.0.1:8080/todo',
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          data: {
            uid: getApp().globalData.uid,
            is_done: 0,
            cid: cid
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




      }
    },
    /*组件所在页面的生命周期 */
    pageLifetimes: {
      show: function() {
        this.setData({
          index: -1,
          slideButtons: [{
            text: '编辑',
            src: '../../imgs/icon_add.png'
          }, {
            type: 'warn',
            text: '删除',
          }],
        });
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
            is_done: 0
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
        this.setData({
          categoryList: []
        });
        wx.request({
          url: 'http://127.0.0.1:8080/category/' + getApp().globalData.uid,
          method: "GET",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': getApp().globalData.sessionId
          },
          success(res) {
            let list = res.data.data;
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

      },
      hide: function() {
        this.setData({
          todoList: []
        });
      },
      resize: function(size) {}
    }
  })