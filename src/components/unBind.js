import React from 'react';
import {Button, Modal, Form, Input, Icon, message,Table} from 'antd';
import {bindWxGroup} from '../services/interface';
import {getGroupList} from '../services/interface';
import BindButton from './bindButton';

export default class UnBind extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      addModalVisible: false,
      source: '',
      dataSource: [],
      pagination: {},
      loading:true,
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id_id'
        },{
        title: '群名称',
        dataIndex: 'groupName',
        key: 'groupName'
      }, {
        title: '群人数',
        dataIndex: 'groupPeopleNum',
        key: 'groupPeopleNum'
      },{
        title: '绑定',
        dataIndex: 'id',
        key: 'id',
        render: (id, row, index) => {
          return (
            <BindButton wxid={this.props.wxid} groupId={id}>绑定</BindButton>
          )
        }
      }]
    };
  }

  componentWillMount () {
    let params = {
      page: 1,
      size: 10,
      bind: 0
    };
    getGroupList(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        dataSource: data.data.data.data,
        pagination
      });
    });
  }

  handleSubmit = () => {
    let formEle = document.querySelector('#groupForm');
    let data = {
      groupName: formEle.groupName.value,
      groupPeopleNum: formEle.groupPeopleNum.value,
    };
    bindWxGroup(data).then(data => {
      console.log(data);
      if (data.data.status === 1) {
        message.success('添加成功！');
      }
      setTimeout(_ => {
        location.reload(true);
      }, 800);
    });
  };

  addModalVisible = () => {
    this.setState({
      addModalVisible: !this.state.addModalVisible
    })
  };

  handleHideAdd = () => {
    this.setState({
      addModalVisible: false
    })
  };

  handleTableChange = (pagination,filters, soter) => {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      loading: true
    });
    let params = {
      page: pagination.current,
      size: 10,
      bind: 0
    };
    getGroupList(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        dataSource: data.data.data.data,
        pagination
      });
    });
  };


  render () {
    return (
      <div>
        <Button onClick={this.addModalVisible}>
          <Icon type="link"/>
        </Button>
        <Modal
          title='未绑定群'
          onCancel={this.handleHideAdd}
          onOk={this.handleHideAdd}
          visible={this.state.addModalVisible}>
          <Table
            size="small"
            pagination={this.state.pagination}
            dataSource={this.state.dataSource}
            columns={this.state.columns}
            onChange={this.handleTableChange}
            loading={this.state.loading}
            rowKey="id"
            bordered/>
        </Modal>
      </div>
    )
  }

};
