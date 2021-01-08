import React from 'react';
import 'antd/dist/antd.css';

import {Input, Layout, Menu, message} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, CardContent, CardHeader, Grid, TextField, Typography} from "@material-ui/core";
import {history} from "../../Utils/History";
import axios from 'axios';


const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
let base = global.data.baseUrl;

export default class StuUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem('Uid'),
      userName: localStorage.getItem('UserName'),
      userId: localStorage.getItem('UserId'),
      Phone: localStorage.getItem('Phone'),
      Mail: localStorage.getItem('Mail'),
      cPhone: '',
      cMail: '',
      showHelp: false
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    let userId = localStorage.getItem('UserId');
    let Url = base + 'user/getUsrInfo/' + userId;
    let _this = this;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200) {
          // let User = resp.data;
          let username = resp.data.username;
          let userid = resp.data.userId;
          let phone = resp.data.phone;
          let mail = resp.data.email;
          _this.setState({
            userName: username,
            userId: userid,
            Phone: phone,
            Mail: mail
          }, function () {
            console.log(_this.state);
          });

          this.state.cMail = mail;
          this.state.cPhone = phone;
          this.state.userId = userid;
          this.state.userName = username;
        }
      });
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

  storeCPhone = (event) => {
    this.setState({'cPhone': event.target.value});
  };

  storeCMail = (event) => {
    this.setState({'cMail': event.target.value});
  };

  handleSubmit = () => {
    let Url = base + 'user/modify';
    let userId = this.state.id;
    let data = {
      id: userId,
      email: this.state.cMail,
      phone: this.state.cPhone
    };
    axios.post(Url, data)
      .then(resp => {
        if (resp && resp.status === 200) {
          if (resp.data.code === 200) {
            message.success('修改成功');
          } else if (resp.data.code === 400) {
            message.error('邮箱格式错误')
          } else
            message.error('修改失败');
        }
      })
  };

  render() {
    return (
      <Layout>
        <Sider
          theme={"dark"}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.teaMenuRedirect}>
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
            <Card style={{width: "70%", margin: "150px auto"}}>
              <CardHeader
                title={<Typography variant={"h5"} align={"center"}>
                  个人信息资料
                </Typography>}
              />
              <Grid item xs={12}>
              </Grid>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="姓名"
                      defaultValue={this.state.userName}
                      variant="outlined"
                      style={{width: "90%"}}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="学号"
                      defaultValue={this.state.userId}
                      variant="outlined"
                      style={{width: "90%"}}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="电话"
                      defaultValue={this.state.Phone}
                      variant="outlined"
                      style={{width: "90%"}}
                      onChange={this.storeCPhone}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      id="outlined-disabled"
                      label="邮箱"
                      defaultValue={this.state.Mail}
                      variant="outlined"
                      style={{width: "90%"}}
                      onChange={this.storeCMail}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" size="large" color="primary" component="span"
                            onClick={this.handleSubmit}>
                      确认修改
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}