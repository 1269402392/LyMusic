import ApiVideo from '../../serives/api_video';

Page({
  data: {
    videoDetail: [],
    recommendList: [],
    videoUrl: {},
  },
  onLoad({ id }) {
    this.getVideoPageData(id);
  },
  getVideoPageData(id) {
    ApiVideo.getVideoItemDetail(id).then(({ data }) => {
      this.setData({ videoDetail: data });
    });
    ApiVideo.getRecommendList(id).then(({ data }) => {
      this.setData({ recommendList: data });
    });
    ApiVideo.getVideoUrl(id).then(({ data }) => this.setData({ videoUrl: data }));
  },
});
