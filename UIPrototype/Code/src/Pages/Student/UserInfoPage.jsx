import React from 'react';
import 'antd/dist/antd.css';

import { Layout, Menu, Upload, Input, } from 'antd';
import {
    UploadOutlined,
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";


const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

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

export default class stuUserInfoPage extends React.Component {
    state = {
        user: [{
            "name": "sho",
            "password": "123456",
            "email": "54749110@sjtu.edu.cn",
        }]
    }

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
                    <div className="logo"></div>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<AuditOutlined />}>
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="2" icon={<TableOutlined />}>
                            我的课程
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HighlightOutlined />}>
                            我的作业
                        </Menu.Item>
                        {/*<Menu.Item key="4" icon={<ToTopOutlined />}>*/}
                        {/*    上传作业*/}
                        {/*</Menu.Item>*/}
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
                                            defaultValue="sho"
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
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            select
                                            label="学院"
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
                                            label="班级"
                                            defaultValue="F1803702"
                                            variant="outlined"
                                            style={{width: "90%"}}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-disabled"
                                            label="QQ"
                                            defaultValue="1036788120"
                                            variant="outlined"
                                            style={{width: "90%"}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="outlined-disabled"
                                            label="邮箱"
                                            defaultValue="1036788120@qq.com"
                                            variant="outlined"
                                            style={{width: "90%"}}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="contained" size="large" color="primary" component="span">
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
