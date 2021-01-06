import React from 'react'
import {Input, Layout, Menu, message, PageHeader} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, CardContent, Grid, TextField} from "@material-ui/core";
import {history} from "../../Utils/History";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
let base = global.data.baseUrl;

export default class TeaSubmitCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      courseId: '',
      courseInfo: '',
      open: false,
      teacherId: localStorage.getItem("UserId")
    };
  }

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

  storeName = (event) => {
    this.setState({name: event.target.value});
  };

  storeCourseId = (event) => {
    this.setState({courseId: event.target.value});
  };
  storeCourseInfo = (event) => {
    this.setState({courseInfo: event.target.value});
  };

  storeTeacherId = (event) => {
    this.setState({teacherId: event.target.value});
  };

  openErrDialog = () => {
    this.setState({open: true});
  };

  closeErrDialog = () => {
    this.setState({open: false});
  };

  handleSubmit = () => {
    let Url = base + 'teacher/createcourse';
    let data = {
      name: this.state.name,
      courseId: this.state.courseId,
      courseInfo: this.state.courseInfo,
      teacherId: this.state.teacherId
    }

    if (data.name === "" || data.courseInfo === "" || data.courseId === "") {
      this.openErrDialog();
    } else {
      console.log(data)
      axios.post(Url, data)
        .then(resp => {
          if (resp && resp.status === 200) {
            if (resp.data.code === 200) {
              message.success('提交成功');
            } else
              message.error('提交失败');
          }
        })
    }
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} onClick={this.teaMenuRedirect}>
            <Menu.Item key="1" icon={<UserOutlined/>}>
              个人信息
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined/>}>
              开课申请
            </Menu.Item>
            <Menu.Item key="3" icon={<TableOutlined/>}>
              课程
            </Menu.Item>
            {/* <Menu.Item key="4" icon={<HighlightOutlined />}>
                            发布作业
                        </Menu.Item> */}
            <Menu.Item key="5" icon={<ReadOutlined/>}>
              作业情况
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout" style={{marginLeft: 200}}>
          <Header className="site-layout-background" style={{padding: 0}}/>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <PageHeader
              className="site-page-header"
              title="课程提交申请表"
              subTitle="请按要求填写下表"
            />
            <Dialog
              open={this.state.open}
              onClose={this.closeErrDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"      提交失败     "}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  有必填项目未填写
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.closeErrDialog} color="primary">
                  重试
                </Button>
              </DialogActions>
            </Dialog>
            {/* <Form style={{marginTop:30, marginBottom:0}}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: '请输入课程名!' }]}
                            >
                                <Input value={this.state.name} onChange={this.storeName}/>
                            </Form.Item>

                            <Form.Item
                                label="CourseID"
                                name="CourseID"
                                rules={[{ required: true, message: '请输入课程编号!' }]}
                            >
                                <Input value={this.state.courseId} onChange={this.storeCourseId}/>
                            </Form.Item>

                            <Form.Item
                                label="CourseInfo"
                                name="CourseInfo"
                                rules={[{ required: true, message: '请输入课程信息！' }]}
                            >
                                <Input value={this.state.courseInfo} onChange={this.storeCourseInfo}/>
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" onClick = {this.handleSubmit}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form> */}
            <Card style={{width: "30%", margin: "auto auto"}}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="outlined-password-input"
                      label="课程名"
                      type="name"
                      // rules={[{ required: true, message: '请输入课程名!' }]}
                      variant="outlined"
                      style={{width: "100%"}}
                      onChange={this.storeName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="outlined-password-input"
                      label="课程编号"
                      rules={[{required: true, message: '请输入课程编号!'}]}
                      variant="outlined"
                      style={{width: "100%"}}
                      onChange={this.storeCourseId}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextArea
                      required
                      placeholder="课程信息"
                      rules={[{required: true, message: '请输入课程信息!'}]}
                      variant="outlined"
                      style={{width: "100%"}}
                      onChange={this.storeCourseInfo}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button style={{width: "100%"}} variant="contained" color="primary" size="large"
                            onClick={this.handleSubmit}>提交</Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Content>
          <Footer style={{textAlign: 'center', marginBottom: 0}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
