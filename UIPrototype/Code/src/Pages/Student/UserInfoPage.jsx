import React from 'react';
import 'antd/dist/antd.css';

import { Layout, Menu, Upload, Input, message} from 'antd';
import {
    UploadOutlined,
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {history} from "../../Utils/History";
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

let base = global.data.baseUrl;



export default class StuUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: "sho",
                password: "123456",
                email: "54749110@sjtu.edu.cn",
            },
            cPhone: '',
            cMail: '',
        };
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo = () => {
        let user = localStorage.getItem('UserInfo');
        this.setState({
            user: user
        });
    };

    toStuInfo = () => {
        history.replace('/stuUserInfo');
    };

    toStuCourseList = () => {
        history.replace('/stuCourseList');
    };

    toStuHomeworkList = () => {
        history.replace('/stuHomeworkList', {type: 4});
    };

    stuMenuRedirect = (event) => {
        let key = event.key;
        if(key === '1') {
            this.toStuInfo();
        }
        if(key === '2') {
            this.toStuCourseList();
        }
        if(key === '3') {
            this.toStuHomeworkList();
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
        axios.post(Url, data)
            .then(resp => {
                if(resp && resp.status === 200) {
                    if(resp.data.code === 200) {
                        message.success('修改成功');
                    } else
                        message.error('修改失败');
                }
            })
    };

    render(){
        return(
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

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick = {this.stuMenuRedirect}>
                        <Menu.Item key="1" icon={<AuditOutlined />} >
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="2" icon={<TableOutlined />} >
                            我的课程
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HighlightOutlined />} >
                            我的作业
                        </Menu.Item>
                    </Menu>

                </Sider>

                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
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
                                            defaultValue={this.state.user.name}
                                            variant="outlined"
                                            style={{width: "90%"}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            disabled
                                            id="outlined-disabled"
                                            label="学号"
                                            defaultValue="518030990030"
                                            variant="outlined"
                                            style={{width: "90%"}}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            label="电话"
                                            defaultValue="54749110"
                                            variant="outlined"
                                            style={{width: "90%"}}
                                            onChange={this.storeCPhone}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-disabled"
                                            label="邮箱"
                                            defaultValue="1036788120@qq.com"
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
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
