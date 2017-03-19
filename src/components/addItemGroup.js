import React from 'react';
import {Button, Modal, Form, Input, Icon, message} from 'antd';
import {saveWxGroup} from '../services/interface';
const FormItem = Form.Item;

export default class AddItemGroup extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      groupName: '',
      groupPeopleNum: ''
    };
  }

  handleSubmit = () => {
    let formEle = document.querySelector('#groupForm');
    let data = {
      groupName: formEle.groupName.value,
      groupPeopleNum: formEle.groupPeopleNum.value,
    };
    saveWxGroup(data).then(data => {
      console.log(data);
      if (data.data.status === 1) {
        message.success('添加成功！');
      }
      setTimeout(_ => {
        location.reload(true);
      }, 800);
    });
  };
  handleClick = () => {
    this.props.handleDisplayAdd('add');
  };

  render () {
    return (
      <div>
        <Button type="primary" onClick={this.handleClick}>
          <Icon type="plus"/>添加
        </Button>
        <Modal
          title='添加群记录'
          onCancel={this.props.handleHideAdd}
          onOk={this.handleSubmit}
          visible={this.props.addModalVisible}>
          <Form
            id='groupForm'>
            <FormItem
              label='群名称'
              labelCol={{span: 8}}
              wrapperCol={{span: 12}}>
              <Input type='text' name='groupName' id='groupName'/>
            </FormItem>
            <FormItem
              label='群人数'
              labelCol={{span: 8}}
              wrapperCol={{span: 12}}>
              <Input type='text' required name='groupPeopleNum' id='groupPeopleNum' />
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

};
