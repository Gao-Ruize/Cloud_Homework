import React from 'react'
import {Layout, Menu, message} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {history} from "../../Utils/History";
import axios from 'axios';

let base = global.data.baseUrl;

const {Header, Content, Footer, Sider} = Layout;

const currencies = [
  {
    value: 'EE',
    label: '电子信息与电气工程学院',
  },
  {
    value: 'M',
    label: '机械与动力工程学院',
  },
  {
    value: 'A',
    label: '安泰经济与管理学院',
  },
  {
    value: 'Y',
    label: '药学院',
  },
  {
    value: 'K',
    label: '凯原法学院',
  },
  {
    value: 'MathR',
    label: '数学科学学院',
  },
  {
    value: 'R',
    label: '人文学院',
  },
];


export default class TeaUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem('Uid'),
      name: '',
      userName: '',
      userId: localStorage.getItem('UserId'),
      Phone: '',
      Mail: '',
      cPhone: '',
      cMail: '',
    };
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
          let name = resp.data.name;
          _this.setState({
            userName: username,
            userId: userid,
            Phone: phone,
            Mail: mail,
            name: name
          }, function () {
            console.log(_this.state);
          });
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
    let Url = base + 'api/user/modify';
    let userId = this.state.user.userid;
    let data = {
      id: userId,
      email: this.state.cMail,
      phone: this.state.cPhone
    };

    console.log(data)
    axios.post(Url, data)
      .then(resp => {
        if (resp && resp.status === 200) {
          if (resp.data.code === 200) {
            message.success('修改成功');
          } else
            message.error('修改失败');
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
            <Card style={{width: "50%", margin: "150px auto"}}>
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
                      defaultValue={this.state.name}
                      variant="outlined"
                      style={{width: "90%"}}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="工号"
                      defaultValue={this.state.userId}
                      variant="outlined"
                      style={{width: "90%"}}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="电话"
                      defaultValue={this.state.cPhone}
                      variant="outlined"
                      style={{width: "90%"}}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      select
                      label=""
                      variant="outlined"
                      style={{width: "90%"}}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>


                  <Grid item xs={6}>
                    <TextField
                      id="outlined-disabled"
                      label="昵称"
                      defaultValue={this.state.userName}
                      variant="outlined"
                      style={{width: "90%"}}
                      onChange={this.storeCPhone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="outlined-disabled"
                      label="邮箱"
                      defaultValue={this.state.cMail}
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
