import axios from 'axios';
import config from '../config';

// formData 上传
export function upload (formEle, callback) {
  let request = new XMLHttpRequest();
  request.open('POST', `${config.host}:${config.port}/scanqrcode/uploadQrcodeExcel`);
  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      callback(request);
    }
  };
  request.send(new FormData(formEle));
}

export function saveWxGroup (data) {
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/saveGroup`,
    data
  });
}

export function getGroupList (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/weixinGroup/list`,
    data
  });
}

export function saveWxAccount (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/saveAccount`,
    data
  });
}

export function getWxList (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/weixinAccount/list`,
    data
  });
}

export function bindWxGroup (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/bindAccountGroup`,
    data
  });
}

export function wxGroupDetails (data) {
  data.page--;
  return axios({
    method: 'POST',
    url: `${config.host}:${config.port}/weixin/mine/weixinGroup/list`,
    data
  });
}

