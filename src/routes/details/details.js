/**
 * Created by Administrator on 2017/3/14.
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './details.css';
import { Link } from 'dva/router';
import WxGroupUnBind from '../../components/wxGroupUnBind.js';
import {wxGroupDetails} from '../../services/interface';
import {Tag, Row, Col, Button, Icon, Radio, Table} from 'antd';
const ButtonGroup = Button.Group;

class Details extends Component{
  constructor(props){
    super(props);
    this.state = {
      addModalVisible: false,
      pagination: {},
      dataSource: [],
      loading: true,
      columns: [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },{
        title: '群名称',
        dataIndex: 'groupName',
        key: 'groupName'
      }, {
        title: '群人数',
        dataIndex: 'groupPeopleNum',
        key: 'groupPeopleNum'
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value) => {
          let date = new Date(value);
          return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
      }, {
        title: '更新时间',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (value) => {
          if (value) {
            let date = new Date(value);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
          } else {
            return '--';
          }
        }
      }, {
        title: '解绑',
        dataIndex: 'bind',
        key: 'bind',
        render: (text, record, index) => {
          return (
            <WxGroupUnBind wxid={this.props.params.id} groupId={record.id} />
          );
        }
      }]
    }
  }

  componentWillMount () {
    let params = {
      page: 1,
      size: 10,
      weixinAccountId: this.props.params.id
    };
    wxGroupDetails(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        dataSource: data.data.data.data,
        pagination
      });
    });
  }

  handleHideAdd = () =>{
    this.setState({
      addModalVisible: !this.state.addModalVisible
    });
  };

  handleDisplayAdd = () => {
    this.setState({
      addModalVisible: true
    });
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
      weixinAccountId: this.props.params.id
    };
    wxGroupDetails(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        dataSource: data.data.data.data,
        pagination
      });
    });
  };

  gotoAccount = () => {
    location.hash = '#account';
  };

  render(){
    return (
      <div>
        <Row style={{marginTop: '24px', marginBottom: '10px'}}>
          <Col span={1}>
            <ButtonGroup>
              <Button  shape="circle" onClick={this.gotoAccount}><Icon type="left" /></Button>
            </ButtonGroup>
          </Col>
          <Col span={4}>
            <div style={{paddingTop: '4px'}}><Tag color="pink-inverse">{this.props.params.wxid}</Tag></div>
          </Col>
        </Row>
        <Row>
          <Col span='24' style={{marginTop: '10px'}}>
            <Table
              pagination={this.state.pagination}
              dataSource={this.state.dataSource}
              columns={this.state.columns}
              onChange={this.handleTableChange}
              loading={this.state.loading}
              rowKey="id"
              bordered/>
          </Col>
        </Row>
      </div>
    );
  }
}

Details.propTypes = {
};

export default connect()(Details);
