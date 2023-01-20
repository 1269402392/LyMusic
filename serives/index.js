class Request {
  constructor(base_url) {
    this.base_url = base_url;
  }
  request(url, data, method = 'GET') {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.base_url + url,
        data,
        method,
        success(res) {
          resolve(res.data);
        },
        fail: reject,
      });
    });
  }
  get(url, data) {
    return this.request(url, data, 'GET');
  }
  post(url, data) {
    return this.request(url, data, 'POST');
  }
}

const services = new Request('http://127.0.0.1:3000');
export default services;
