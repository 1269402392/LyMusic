function querySelectorRect(selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.exec(resolve);
  });
}
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
function parseLyric(lyric) {
  const lyricList = lyric.split('\n');
  const lyricInfos = [];
  for (const item of lyricList) {
    const time = timeRegExp.exec(item);
    if (!time) continue;
    const minute = time[1] * 60 * 1000;
    const second = time[2] * 1000;
    const millSecond = time[3];
    const millSecondTime = millSecond.length === 2 ? millSecond * 10 : millSecond * 1;
    const timeReuslt = minute + second + millSecondTime;
    const text = item.replace(timeRegExp, '');
    text && lyricInfos.push({ timeReuslt, text });
  }
  return lyricInfos;
}

function throttle(fn, interval = 1000, options = { leading: true, trailing: false }) {
  // 1.记录上一次的开始时间
  const { leading, trailing, resultCallback } = options;
  let lastTime = 0;
  let timer = null;

  // 2.事件触发时, 真正执行的函数
  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      // 2.1.获取当前事件触发时的时间
      const nowTime = new Date().getTime();
      if (!lastTime && !leading) lastTime = nowTime;

      // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
      const remainTime = interval - (nowTime - lastTime);
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        // 2.3.真正触发函数
        const result = fn.apply(this, args);
        if (resultCallback) resultCallback(result);
        resolve(result);
        // 2.4.保留上次触发的时间
        lastTime = nowTime;
        return;
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null;
          lastTime = !leading ? 0 : new Date().getTime();
          const result = fn.apply(this, args);
          if (resultCallback) resultCallback(result);
          resolve(result);
        }, remainTime);
      }
    });
  };

  _throttle.cancel = function () {
    if (timer) clearTimeout(timer);
    timer = null;
    lastTime = 0;
  };

  return _throttle;
}

export { querySelectorRect, throttle, parseLyric };
