import React,{Component} from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Link } from 'dva/router';
import {Modal, Row, Col, Button, Icon, Radio} from 'antd';
const ButtonGroup = Button.Group;

class IndexPage extends Component{
  constructor(props) {
    super(props);
  }



  render(){
    return (
      <div>
        <Row>
          <Col span='18' push='3'>
            <Row><div className={styles.banner}><p>王者荣耀，等你来战</p></div></Row>
            <Row>{this.props.children}</Row>
          </Col>
        </Row>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
