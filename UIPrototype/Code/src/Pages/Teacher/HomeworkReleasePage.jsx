import React from 'react'
import {Button, DatePicker, Form, Input, Layout, Menu, message, PageHeader} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from "axios";

let base = global.data.baseUrl;
const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;


export default class TeaHomeworkRelease extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      content: '',
      releasetime: '',
      deadline: '',
      courseId: this.props.location.state.courseKey,
    }
  }

  storeName = (event) => {
    this.setState({name: event.target.value});
  };

  storeId = (event) => {
    this.setState({id: event.target.value});
  };
  storeContent = (event) => {
    this.setState({content: event.target.value});
  };

  storeReleasetime = (date, dateString) => {
    this.setState({releasetime: dateString});
  };

  storeDeadline = (date, dateString) => {
  };

  toTeaInfo = () => {
    history.replace('/teaUserInfo')
  }

  toTeaCourseList = () => {
    history.replace('/teaCourseList')
  }

  toTeaSubmitCourse = () => {
    history.replace('/teaSubmitCourse')
  }

  toTeaHomeworkList = () => {
    history.replace('/teaHomeworkList')
  }

  toTeaHomeworkRelease = () => {
    history.replace('/teaHomeworkRelease')
  }

  teaMenuRedirect = (event) => {
    let key = event.key;
    if (key === '1') {
      this.toTeaInfo();
    }
    if (key === '2') {
      this.toTeaSubmitCourse();
    }
    if (key === '3') {
      this.toTeaCourseList();
    }
    if (key === '4') {
      this.toTeaHomeworkRelease();
    }
    if (key === '5') {
      this.toTeaHomeworkList();
    }
  };

  handleSubmit = () => {
    let Url = base + 'teacher/createhomework';
    let data = {
      id: this.state.id,
      name: this.state.name,
      content: this.state.content,
      releasetime: this.state.releasetime,
      deadline: this.state.deadline,
      courseId: this.state.courseId
    }
    console.log(data)
    axios.post(Url, data)
      .then(resp => {
        if (resp && resp.status === 200) {
          if (resp.data.code === 200) {
            message.success('发布成功');
          } else
            message.error('发布失败');
        }
      })
  };

  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick={this.teaMenuRedirect}>
            <Menu.Item key="1" icon={<UserOutlined/>}>
              个人信息
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined/>}>
              开课申请
            </Menu.Item>
            <Menu.Item key="3" icon={<TableOutlined/>}>
              课程
            </Menu.Item>
            <Menu.Item key="5" icon={<ReadOutlined/>}>
              作业情况
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout" style={{marginLeft: 200}}>
          <Header className="site-layout-background" style={{padding: 0}}/>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
              <PageHeader
                className="site-page-header"
                title="作业发布表"
                subTitle="请按要求填写下表"
              />

              <Form style={{marginTop: 30}}>
                <Form.Item
                  label="作业名称"
                  name="name"
                  rules={[{required: true, message: '请输入作业名称!'}]}
                >
                  <TextArea rows={1} value={this.state.name} onChange={this.storeName}/>
                </Form.Item>

                <Form.Item
                  label="作业内容"
                  name="content"
                  rules={[{required: true, message: '请输入作业内容!'}]}
                >
                  <TextArea rows={5} value={this.state.content} onChange={this.storeContent}/>
                </Form.Item>

                <Form.Item label="选择作业时间" style={{marginBottom: 0, alignContent: "left"}}>
                  <Form.Item
                    style={{display: 'inline-block', width: 'calc(50% - 12px)'}}
                  >
                    <DatePicker onChange={this.storeReleasetime}/>
                  </Form.Item>
                  <span
                    style={{display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center'}}
                  > to </span>
                  <Form.Item style={{display: 'inline-block', width: 'calc(50% - 12px)'}}>
                    <DatePicker onChange={this.storeDeadline}/>
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
