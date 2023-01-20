import ApiMusic from '../../serives/api_music';
import { parseLyric } from '../../utils/index';

const audioContext = wx.createInnerAudioContext();

Page({
  data: {
    songsInfo: {},
    lyricInfo: {},
    currentTab: 0,
    contentHeight: 0,
    song: {},
    isPlay: true,
    sliderValue: 0,
    currentSongIndex: 0,
    isSliderChanging: false,
  },
  async onLoad(options) {
    const result = await ApiMusic.getMusicInfo(options.ids);
    const lyric = await ApiMusic.getMusicLyric(options.ids);
    const lyricInfo = parseLyric(lyric.lrc.lyric);
    const song = await ApiMusic.getMusicSong(options.ids);
    const { statusBarHeight, screenHeight, navBarHeight } = getApp().globalData;
    const contentHeight = screenHeight - statusBarHeight - navBarHeight;
    this.setData({
      songsInfo: result.songs[0],
      lyricInfo,
      contentHeight,
      song: song.data[0],
    });
    audioContext.src = this.data.song.url;
    audioContext.onCanplay(() => {
      audioContext.play();
    });
    audioContext.onTimeUpdate(() => {
      const { lyricInfo, currentSongIndex, isSliderChanging } = this.data;
      const currentTime = audioContext.currentTime * 1000;
      const currentIndex = lyricInfo.findIndex(item => currentTime < item.timeReuslt);
      if (currentIndex !== currentSongIndex) {
        console.log(currentIndex);
        this.setData({
          currentSongIndex: currentIndex === lyricInfo.length - 1 ? currentIndex + 1 : currentIndex,
        });
      }
      if (!isSliderChanging) {
        this.setData({ sliderValue: currentTime });
      }
    });
    audioContext.onEnded(() => {
      this.setData({ isPlay: false, sliderValue: 0 });
    });
  },
  handlerSliderChange(e) {
    audioContext.pause();
    const { value } = e.detail;
    console.log(value);
    audioContext.seek(value / 1000);
    this.setData({ currentTime: value, sliderValue: value, isPlay: true, isSliderChanging: false });
  },
  sliderChanging() {
    this.setData({ isSliderChanging: true });
  },
  handlerSwiperChange(e) {
    this.setData({ currentTab: e.detail.current });
  },
  handlePlayClick() {
    const isPlay = !this.data.isPlay;
    this.setData({ isPlay });
    isPlay ? audioContext.play() : audioContext.pause();
  },
  lyricLineClick(e) {
    audioContext.pause();
    const index = e.currentTarget.dataset.index;
    const currentLyric = this.data.lyricInfo[index];
    audioContext.seek(currentLyric.timeReuslt / 1000);
    this.setData({ currentSongIndex: index + 1, currentTime: currentLyric.timeReuslt });
  },
  backHomeView() {
    console.log('back');
    wx.switchTab({
      url: '/pages/home-music/index',
    });
  },
});
