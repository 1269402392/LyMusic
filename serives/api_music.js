import services from './index';
class ApiMusic {
  static getBannerList() {
    return services.get('/banner', { type: 2 });
  }
  static getSongList(limit = 1, tag = '欧美') {
    return services.get('/top/playlist/highquality', { limit, tag });
  }
  static userLogin(phone, sms) {
    return services.get('/login/cellphone', { phone, captcha: sms });
  }
  static sendPhoneSms(phone) {
    return services.get('/captcha/sent', { phone });
  }
  static getMusicInfo(ids) {
    return services.get('/song/detail', { ids });
  }
  static getMusicLyric(id) {
    return services.get('/lyric', { id });
  }
  static getMusicSong(id) {
    return services.get('/song/url', {id})
  }
}

export default ApiMusic;
