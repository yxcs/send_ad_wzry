import React from 'react';
import ReactDom from 'react-dom';
import {Button, Icon, Modal, Form, Input, Row, Col} from 'antd';
import {upload} from '../services/interface';
import config from '../config';
const FormItem = Form.Item;

export default class Upload extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      modalVisible: false,
      uploadBtn: 'cloud-upload',
      formEle: null,
      uploadFilePath: `${config.host}:${config.port}/scanqrcode/uploadQrcodeExcel`
    };
  }
  handleaddFile () {
    document.querySelector('#input').click();
  }
  openModal = () => {
    this.setState({
      modalVisible: true
    });
  };
  handleOk = () => {
    let formData = new FormData();
    this.setState({
      uploadBtn: 'loading'
    });
    upload(this.state.formEle, (response) => {
      let data = JSON.parse(response.response);
      this.setState({
        uploadBtn: 'cloud-upload'
      });
      if (data.status === 1) {
        this.setState({
          filename: `${this.state.originFileName}
          成功：${data.data.successCount}条
          失败：${data.data.failureCount}条
          重复：${data.data.repeatCount}条`
        });
      } else {
        this.setState({
          filename: `${this.state.originFileName}
          上传失败：${data.msg} ${data.details}`
        });
      }
    });
    // 开始上传文件
  };
  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };
  handleChange = (e) => {
    let formEle = document.querySelector('#form');
    this.setState({
      formEle,
      originFileName: new FormData(formEle).get('file').name,
      filename: new FormData(formEle).get('file').name
    });
  };
  render () {
    return (
      <div>
        <Button type='primary' shape='circle' size='large' onClick={this.openModal}>
          <Icon type='upload'></Icon>
        </Button>
        <Modal
          title='上传广告信息的EXCEL表格'
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Form
            onSubmit={this.handleSubmit}
            style={{display: 'none'}}
            id='form'
            action={this.state.uploadFilePath}
            method='post'
            encType='multipart/form-data'
          >
            <FormItem>
              <Input type='file' name='file' id='input'onChange={this.handleChange}></Input>
            </FormItem>
          </Form>
          <p style={{textAlign: 'center', fontWeight: 'bold', marginBottom: '10px'}}
          >{this.state.filename}</p>
          <Row style={{textAlign: 'center'}}>
            <Button type='primary' size='large' onClick={this.handleaddFile}>
              <Icon type={this.state.uploadBtn} />
            </Button>
          </Row>
        </Modal>
      </div>
    )
  }
};
