import React from 'react';
import {Button, Modal, Form, Input, Icon, message} from 'antd';
import {saveWxAccount} from '../services/interface';
const FormItem = Form.Item;

export default class AddItemWx extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      wxId: '',
      wxAccount: '',
      wxName: ''
    };
  }

  handleSubmit = () => {
    let formEle = document.querySelector('#groupForm');
    let data = {
      wxId: formEle.wxId.value,
      wxAccount: formEle.wxAccount.value,
      wxName: formEle.wxName.value
    };
    saveWxAccount(data).then(data => {
      if (data.data.status === 1) {
        message.success('添加成功！');
      }
      setTimeout(_ => {
        location.reload(true);
      }, 800);
    });
  };

  handleClick = () => {
    this.props.handleDisplayAdd();
  };

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>
          <Icon type="plus"/>添加
        </Button>
        <Modal
          title='添加微信号'
          onCancel={this.props.handleHideAdd}
          onOk={this.handleSubmit}
          visible={this.props.addModalVisible}>
          <Form
            id='groupForm'>
            <FormItem
              label='微信ID'
              labelCol={{span: 8}}
              wrapperCol={{span: 12}}>
              <Input type='text' name='wxId' id='wxId'/>
            </FormItem>
            <FormItem
              label='微信账号'
              labelCol={{span: 8}}
              wrapperCol={{span: 12}}>
              <Input type='text' name='wxAccount' id='wxAccount'/>
            </FormItem>
            <FormItem
              label='微信名称'
              labelCol={{span: 8}}
              wrapperCol={{span: 12}}>
              <Input type='text' name='wxName' id='wxName'/>
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

};
