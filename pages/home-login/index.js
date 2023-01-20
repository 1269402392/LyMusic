import ApiMusic from '../../serives/api_music';
import { updateUserInfo } from '../../store/index';
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    phone: '',
    sms: '',
    profile: {},
    token: '',
  },
  async handleGetSmsClick() {
    await ApiMusic.sendPhoneSms(this.data.phone);
  },
  async handleLoginClick() {
    const { phone, sms } = this.data;
    const result = await ApiMusic.userLogin(phone, sms);
    this.setData({
      profile: result.profile,
      token: result.token,
    });
    updateUserInfo(result);
    if (result.code === 200) {
      Toast.success('登录成功');
    }
  },
});
