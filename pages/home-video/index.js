import ApiVideo from '../../serives/api_video';

Page({
  data: {
    videoList: [],
    hasMore: true,
  },
  onLoad() {
    this.requestVideoList();
  },
  async requestVideoList(offset) {
    const {
      data: { videoList, hasMore: isRequest },
    } = this;
    if (!isRequest) return;
    wx.showNavigationBarLoading();
    const { data, hasMore } = await ApiVideo.getVideoList(offset);
    this.setData({ hasMore });
    wx.hideNavigationBarLoading();
    if (videoList.length && offset) {
      this.setData({ videoList: videoList.concat(data) });
      return;
    }
    this.setData({ videoList: data });
  },
  async onPullDownRefresh() {
    this.setData({ hasMore: true });
    await this.requestVideoList(0);
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    this.requestVideoList(this.data.videoList.length);
  },
  handlerVideoItemClick(event) {
    const { id } = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/video-detail/index?id=${id}`,
    });
  },
});
