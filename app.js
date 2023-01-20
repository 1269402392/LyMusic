App({
  onLaunch() {
    const info = wx.getSystemInfoSync();
    this.globalData.statusBarHeight = info.statusBarHeight;
    this.globalData.screenHeight = info.screenHeight;
    console.log(info);
  },
  globalData: {
    statusBarHeight: 0,
    screenHeight: 0,
    navBarHeight: 44
  },
});
