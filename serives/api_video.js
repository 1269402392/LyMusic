import services from './index';
class ApiVideo {
  static getVideoList(offset = 0) {
    return services.get('/top/mv', { offset, limit: 20 });
  }
  static getVideoItemDetail(id = '') {
    return services.get('/mv/detail', { mvid: id });
  }
  static getRecommendList(id) {
    return services.get('/related/allvideo', { id });
  }
  static getVideoUrl(id) {
    return services.get('/mv/url', { id });
  }
}

export default ApiVideo;
