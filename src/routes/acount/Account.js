/**
 * Created by Administrator on 2017/3/10.
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './Account.css';
import { Link } from 'dva/router';
import AddItemWx from '../../components/addItemWx.js';
import UnBind from '../../components/unBind.js';
import {getWxList} from '../../services/interface';
import {Modal, Row, Col, Button, Icon, Radio, Table} from 'antd';
const ButtonGroup = Button.Group;

class AccountPage extends Component{
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
        key: 'id_id'
      },{
        title: '微信账号',
        dataIndex: 'wxAccount',
        key: 'wxAccount',
        render: (value, record) => {
          return (
            <Link to={'details/' + record.wxAccount + '/' + record.id}>{value}</Link>
          );
        }
      }, {
        title: '微信ID',
        dataIndex: 'wxId',
        key: 'wxId'
      },{
        title: '微信名称',
        dataIndex: 'wxName',
        key: 'wxName'
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
        title: '绑定',
        dataIndex: 'id',
        key: 'id',
        render: (id, row, index) => {
          return (
            <UnBind wxid={id}/>
          )
        }
      }]
    }
  }

  componentWillMount () {
    let params = {
      page: 1,
      size: 10
    };
    getWxList(params).then(data => {
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
      size: 10
    };
    getWxList(params).then(data => {
      let pagination = this.state.pagination;
      pagination.total = data.data.data.totalItem;
      this.setState({
        loading: false,
        dataSource: data.data.data.data,
        pagination
      });
    });
  };

  gotoGroups = () => {
    location.hash = '#groups';
  };

  render(){
    return (
      <div>
        <Row style={{marginTop: '24px', marginBottom: '10px'}}>
          <Col span={4}>
            <ButtonGroup>
              <Button type="primary">微信账号</Button>
              <Button onClick={this.gotoGroups}>微信群</Button>
            </ButtonGroup>
          </Col>
          <Col span='2'>
            <AddItemWx
              handleDisplayAdd={this.handleDisplayAdd}
              handleHideAdd={this.handleHideAdd}
              addModalVisible={this.state.addModalVisible}/>
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

AccountPage.propTypes = {
};

export default connect()(AccountPage);
