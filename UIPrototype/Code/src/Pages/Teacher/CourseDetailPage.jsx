import React from 'react'
import {Button, Descriptions, Layout, Menu, Timeline, Space, PageHeader, Row, Col} from 'antd';
import {Image, Typography} from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
// const data = {
//     code: 'SE125',
//     name: "计算机视觉",
//     teacher: "王肇国",
//     address: '东上院411',
//     time: ['周一3-4节',', ', '周二3-4节'],
//     status: {sta: '正在进行', color: 'green'},
//     sem: ['2019-2020', ' Spring']
// }

export default class teaCourseDetailPage extends React.Component{
    state = {
        current: 'mail',
        courseInfo:{
            imgUrl:'https://i.loli.net/2020/10/08/LHWT2zrwkU3lQPK.png',
            name:'校纪校规学习',
            courseID:'se000',
            time:'2020 fall',
            describe:'加深学生对学校校纪校规学习的理解,避免违法乱纪的现象发生',
            plan:'每周一到周五8:00-10:00上课，共18周，无考试',
            books:'校纪校规手册'
        }
    };

    render(){
        return(
            <Layout>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}
                >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FormOutlined />}>
                            开课申请
                        </Menu.Item>
                        <Menu.Item key="3" icon={<TableOutlined />}>
                            课程
                        </Menu.Item>
                        <Menu.Item key="4" icon={<HighlightOutlined />}>
                            发布作业
                        </Menu.Item>
                        <Menu.Item key="5" icon={<ReadOutlined />}>
                            作业情况
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

                            <Row>
                                <Col span={24}>
                                    <div style={{float:'left'}}>
                                        <PageHeader
                                            className="site-page-header"
                                            title="教师课程主页"
                                            subTitle="课程相关操作"
                                        />
                                    </div>
                                </Col>
                            </Row>

                            <Row style = {{paddingTop: 15}} align="top">
                                <Col span={8}>
                                    <Image
                                        width={400}
                                        height={200}
                                        src={this.state.courseInfo.imgUrl}
                                    />
                                </Col>
                                <Col span={16}>
                                    <div>
                                        <Title>{this.state.courseInfo.name}</Title>
                                        <Title level={2}>{this.state.courseInfo.courseID}</Title>
                                        <Title level={3}>{this.state.courseInfo.time}</Title>
                                    </div>
                                </Col>
                            </Row>

                            <Row style = {{paddingTop: 30}} align="top">
                                <Col span={24}>
                                    <div className='CTBar' style={{float: 'left'}}>
                                        <Space>
                                            <Button type="primary" size="large">发布作业</Button>
                                            <Button type="primary" size="large">批改作业</Button>
                                            <Button type="primary" size="large">作业详情</Button>
                                            <Button type="primary" size="large">添加学生</Button>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>

                            <Row style = {{paddingTop: 30}} >
                                <Col span={24}>
                                    <Descriptions title="课程详情" bordered column={5}>
                                        <Descriptions.Item label="课程名称" span={3}>
                                            {this.state.courseInfo.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="课号" span={2}>
                                            {this.state.courseInfo.courseID}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="课程简介" span={3}>
                                            {this.state.courseInfo.describe}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="课程时间" span={2}>
                                            {this.state.courseInfo.time}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="教学计划" span={2}>
                                            {this.state.courseInfo.plan}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="教材" span={3}>
                                            {this.state.courseInfo.books}
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}