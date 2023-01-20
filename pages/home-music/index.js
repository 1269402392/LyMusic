import ApiMusic from '../../serives/api_music';
import { querySelectorRect, throttle } from '../../utils/index';

const throttleRect = throttle(querySelectorRect, 100, { trailing: true });
Page({
  data: {
    swiperImageHeight: 0,
    banners: [],
    songList: [],
  },
  onLoad() {
    ApiMusic.getBannerList().then(({ banners }) => this.setData({ banners }));
    ApiMusic.getSongList(5).then(({ playlists }) => this.setData({ songList: playlists  }));
  },
  handleImageLoad() {
    throttleRect('.swiper-image').then(([rect]) => {
      this.setData({ swiperImageHeight: rect.height });
    });
  },
  handleSearchClick() {
    wx.navigateTo({
      url: '/pages/home-search/index',
    });
  },
});
