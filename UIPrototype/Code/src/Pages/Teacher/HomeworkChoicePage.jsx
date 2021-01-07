import React from 'react'
import {Button, DatePicker, Form, Input, Layout, Menu, message, PageHeader} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from "axios";

let base = global.data.baseUrl;
const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;


export default class TeaHomeworkChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseid: parseInt(this.props.location.state.id)
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
  storeChoicea = (event) => {
    this.setState({choicea: event.target.value});
  };
  storeChoiceb = (event) => {
    this.setState({choiceb: event.target.value});
  };
  storeChoicec = (event) => {
    this.setState({choicec: event.target.value});
  };
  storeChoiced = (event) => {
    this.setState({choiced: event.target.value});
  };
  storeAnswer = (event) => {
    this.setState({answer: event.target.value});
  };


  storeDeadline = (date, dateString) => {
    this.setState({deadline: dateString});
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
    let Url = base + 'teacher/submitchoice';
    let data = {
      content: this.state.content,
      choicea: this.state.choicea,
      choiceb: this.state.choiceb,
      choicec: this.state.choicec,
      choiced: this.state.choiced,
      answer: this.state.answer,
      deadline: this.state.deadline,
      courseid: this.state.courseid,
    }
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
            <div className="site-layout-background" style={{padding: 24}}>
              <PageHeader
                className="site-page-header"
                title="作业发布表"
                subTitle="选择题"
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
                  label="题   目"
                  name="content"
                  rules={[{required: true, message: '请输入作业内容!'}]}
                >
                  <TextArea rows={2} value={this.state.content} onChange={this.storeContent}/>
                </Form.Item>
                <Form.Item
                  label="选项 A"
                  name="choicea"
                  rules={[{required: true, message: '请输入选项A!'}]}
                >
                  <TextArea rows={1} value={this.state.choicea} onChange={this.storeChoicea}/>
                </Form.Item>
                <Form.Item
                  label="选项 B"
                  name="choiceb"
                  rules={[{required: true, message: '请输入选项B!'}]}
                >
                  <TextArea rows={1} value={this.state.choiceb} onChange={this.storeChoiceb}/>
                </Form.Item>
                <Form.Item
                  label="选项 C"
                  name="choicec"
                  rules={[{required: true, message: '请输入选项C!'}]}
                >
                  <TextArea rows={1} value={this.state.choicec} onChange={this.storeChoicec}/>
                </Form.Item>
                <Form.Item
                  label="选项 D"
                  name="choiced"
                  rules={[{required: true, message: '请输入选项D!'}]}
                >
                  <TextArea rows={1} value={this.state.choiced} onChange={this.storeChoiced}/>
                </Form.Item>
                <Form.Item
                  label="答  案"
                  name="answer"
                  rules={[{required: true, message: '请输入答案!'}]}
                >
                  <TextArea rows={1} value={this.state.answer} onChange={this.storeAnswer}/>
                </Form.Item>

                <Form.Item label="选择截止时间" rules={[{required: true, message: '请输入截止日期!'}]}>
                    <DatePicker onChange={this.storeDeadline}/>
                </Form.Item>
                <Form.Item>
                  <Button type="primary"  style = {{marginTop:"20px"}}onClick={this.handleSubmit}>
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
