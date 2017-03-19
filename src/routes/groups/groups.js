/**
 * Created by Administrator on 2017/3/10.
 */
import React,{Component} from 'react';
import { connect } from 'dva';
import AddItemGroup from '../../components/addItemGroup.js';
import {getGroupList} from '../../services/interface';
import { Link } from 'dva/router';
import {Modal, Row, Col, Button, Icon, Radio,Table} from 'antd';
const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Groups extends Component{
  constructor(props) {
    super(props);
    this.state = {
      addModalVisible: false,
      loading: true,
      dataSource: [],
      pagination: {},
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
          let date1 = new Date(value);
          return `${date1.toLocaleDateString()} ${date1.toLocaleTimeString()}`;
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
        title: '是否绑定',
        dataIndex: 'bind',
        key: 'bind',
        render: (text) => {
          if (text == 0) {
            return (
              <span style={{color:'#FFBF00'}}><Icon type="disconnect" /> 未绑定</span>
            );
          } else {
            return (
              <span style={{color:'#00A854'}}><Icon type="link" /> 已绑定</span>
            );
          }
        }
      }]
    };
  }
  componentWillMount () {
    let params = {
      page: 1,
      size: 10
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

  handleHideAdd = () =>{
    this.setState({
      addModalVisible: !this.state.addModalVisible
    });
  };

  handleDisplayAdd = (type, data) => {
    this.setState({
      addModalVisible: true
    });
  };

  handleBindChange = (e) => {
    const v = e.target.value;
    let params = {
      bind:'',
      page:1,
      size:10
    };
    if(v === 'BIND'){
      params.bind = 1;
    }else if(v === 'NO_BIND'){
      params.bind = 0;
    }

    this.setState({
      loading: true
    });

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

  handleTableChange = (pagination, filters, soter) => {
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

  gotoAccount = () => {
    location.hash = '#account';
  };

  render() {
    return (
      <div>
        <Row style={{marginTop: '24px', marginBottom: '10px'}}>
          <Col span='4'>
            <ButtonGroup>
              <Button onClick={this.gotoAccount}>微信账号</Button>
              <Button type="primary">微信群</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row style={{marginTop: '30px'}}>
          <Col span='6'>
            <RadioGroup defaultValue='ALL' onChange={this.handleBindChange}>
              <RadioButton value='NO_BIND'>未绑定</RadioButton>
              <RadioButton value='BIND'>已绑定</RadioButton>
              <RadioButton value='ALL'>全部</RadioButton>
            </RadioGroup>
          </Col>
          <Col span='2'>
            <AddItemGroup
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

Groups.propTypes = {
};

export default connect()(Groups);
