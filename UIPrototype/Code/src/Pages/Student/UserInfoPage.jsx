import React from 'react';
import 'antd/dist/antd.css';

import { Layout, Menu, Upload, Input, message, Form } from 'antd';
import {
    UploadOutlined,
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {history} from "../../Utils/History";
import axios from 'axios';


const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

let base = global.data.baseUrl;

export default class StuUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem('Uid'),
            userName: '',
            userId: localStorage.getItem('UserId'),
            Phone: '',
            Mail: '',
            cPhone: '',
            cMail: '',
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
                if(resp && resp.status === 200) {
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
                }
            });
    };

    toStuInfo = () => {
        history.replace('/stuUserInfo');
    };

    toStuCourseList = () => {
        history.replace('/stuCourseList');
    };

    toStuHomeworkList = () => {
        history.replace('/stuHomeworkList', {type: 3});
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
        let Url = base + 'user/modify';
        let userId = this.state.id;
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
                        <Card style={{width: "70%", margin: "150px auto"}}>
                            <CardHeader
                                title={<Typography variant={"h5"} align={"center"}>
                                    个人信息资料
                                </Typography>}
                            />

                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    label="用户姓名"
                                    name="username"
                                >
                                    <Input style={{width: "70%"}} disabled defaultValue={this.state.userName}/>
                                </Form.Item>

                                <Form.Item
                                    label="用户账号"
                                    name="id"
                                >
                                    <Input style={{width: "70%"}} disabled defaultValue={this.state.userId} />
                                </Form.Item>

                                <Form.Item
                                    label="用户电话"
                                    name="phone"
                                >
                                    <Input style={{width: "70%"}} defaultValue={this.state.Phone}
                                           onChange={this.storeCPhone}/>
                                </Form.Item>

                                <Form.Item
                                    label="用户邮箱"
                                    name="mail"
                                >
                                    <Input style={{width: "70%"}} defaultValue={this.state.Mail}
                                           onChange={this.storeCMail}/>
                                </Form.Item>

                                <Form.Item>
                                    <Button style={{marginLeft: "67%"}} variant="contained" size="large" color="primary" component="span"
                                        onClick={this.handleSubmit}>
                                    确认修改
                                    </Button>
                                </Form.Item>


                            </Form>

                            <Grid item xs={12}>
                            </Grid>
                            {/*<CardContent>*/}
                            {/*    <Grid container spacing={3}>*/}
                            {/*        <Grid item xs={6}>*/}
                            {/*            /!*<TextField*!/*/}
                            {/*            /!*    disabled*!/*/}
                            {/*            /!*    id="outlined-disabled"*!/*/}
                            {/*            /!*    label="姓名"*!/*/}
                            {/*            /!*    placeholder={this.state.userName}*!/*/}
                            {/*            /!*    variant="outlined"*!/*/}
                            {/*            /!*    style={{width: "90%"}}*!/*/}
                            {/*            /!*//*/}
                            {/*            <Input placeholder={this.state.userName}/>*/}
                            {/*        </Grid>*/}
                            {/*        <Grid item xs={6}>*/}
                            {/*            <TextField*/}
                            {/*                disabled*/}
                            {/*                id="outlined-disabled"*/}
                            {/*                label="学号"*/}
                            {/*                defaultValue={this.state.userId}*/}
                            {/*                variant="outlined"*/}
                            {/*                style={{width: "90%"}}*/}
                            {/*            />*/}
                            {/*        </Grid>*/}

                            {/*        <Grid item xs={6}>*/}
                            {/*            <TextField*/}
                            {/*                label="电话"*/}
                            {/*                defaultValue={this.state.Phone}*/}
                            {/*                variant="outlined"*/}
                            {/*                style={{width: "90%"}}*/}
                            {/*                onChange={this.storeCPhone}*/}
                            {/*            />*/}
                            {/*        </Grid>*/}

                            {/*        <Grid item xs={6}>*/}
                            {/*            <TextField*/}
                            {/*                id="outlined-disabled"*/}
                            {/*                label="邮箱"*/}
                            {/*                defaultValue={this.state.Mail}*/}
                            {/*                variant="outlined"*/}
                            {/*                style={{width: "90%"}}*/}
                            {/*                onChange={this.storeCMail}*/}
                            {/*            />*/}
                            {/*        </Grid>*/}
                            {/*        <Grid item xs={6}>*/}
                            {/*            <Button variant="contained" size="large" color="primary" component="span"*/}
                            {/*                    onClick={this.handleSubmit}>*/}
                            {/*                确认修改*/}
                            {/*            </Button>*/}
                            {/*        </Grid>*/}

                            {/*    </Grid>*/}
                            {/*</CardContent>*/}
                        </Card>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
