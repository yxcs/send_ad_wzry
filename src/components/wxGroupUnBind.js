import React from 'react';
import {Button,message} from 'antd';
import {bindWxGroup} from '../services/interface';

export default class WxGroupUnBind extends React.Component {
  constructor (props) {
    super(props);
  }

  handleCLick = () => {
    let params = {
      weixinAccountId: this.props.wxid,
      weixinGroupId: this.props.groupId,
      bind:0
    };

    bindWxGroup(params).then(data => {
      if (data.data.status === 1) {
        message.success('解绑成功！');
      }
      setTimeout(_ => {
        location.reload(true);
      }, 500);
    });
  };

  render () {
    return (
      <Button onClick={this.handleCLick}>解绑</Button>
    )
  }

};
