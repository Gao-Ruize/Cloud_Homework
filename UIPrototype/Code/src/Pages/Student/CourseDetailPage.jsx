import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, Button, Timeline, Descriptions, Space, PageHeader} from 'antd';
import {
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {history} from "../../Utils/History";

const { Header, Content, Footer, Sider } = Layout;

const data = {
    code: 'SE125',
    name: "计算机视觉",
    teacher: "王肇国",
    address: '东上院411',
    time: ['周一3-4节',', ', '周二3-4节'],
    status: {sta: '正在进行', color: 'green'},
    sem: ['2019-2020', ' Spring']
}


export default class StuCourseDetail extends React.Component {
    toStuInfo = () => {
        history.replace('/stuUserInfo');
    };

    toStuCourseList = () => {
        history.replace('/stuCourseList');
    };

    toStuHomeworkList = () => {
        history.replace('/stuHomeworkList')
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

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} onClick = {this.stuMenuRedirect}>
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
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <PageHeader
                                className="site-page-header"
                                onBack={() => null}
                                title="课程详情"
                                subTitle="返回到课程列表"
                            />
                            <br />
                            <Descriptions title="课程详情">
                                <Descriptions.Item label="课程代码">{data.code}</Descriptions.Item>
                                <Descriptions.Item label="课程名称">{data.name}</Descriptions.Item>
                                <Descriptions.Item label="授课教师">{data.teacher}</Descriptions.Item>
                                <Descriptions.Item label="教室">{data.address}</Descriptions.Item>
                                <Descriptions.Item label="状态">{data.status.sta}</Descriptions.Item>
                                <Descriptions.Item label="学期">{data.sem}</Descriptions.Item>
                                <Descriptions.Item label="上课时间">{data.time}</Descriptions.Item>
                            </Descriptions>
                            <Timeline mode='left'>
                                <Timeline.Item label="2020-09-01 09:12:11">Homework1</Timeline.Item>
                                <Timeline.Item label="2020-10-01 09:12:11">Lab1</Timeline.Item>
                                <Timeline.Item label="2020-10-05 09:12:11">Homework2</Timeline.Item>
                                <Timeline.Item label="2020-11-02 09:12:11">Lab2</Timeline.Item>
                            </Timeline>
                            <Space>
                                <Button type="primary" size='large'>
                                    查看全部作业
                                </Button>
                                <Button type="primary" size='large'>
                                    查看未完成作业
                                </Button>
                                <Button type="primary" size='large'>
                                    查看已完成作业
                                </Button>
                                <Button type="primary" size='large'>
                                    查看成绩
                                </Button>
                            </Space>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
