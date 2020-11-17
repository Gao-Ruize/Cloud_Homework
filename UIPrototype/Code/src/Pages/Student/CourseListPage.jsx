import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, Table, Tag, Space, PageHeader, Button, Popconfirm} from 'antd';
import {

    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import Avatar from "@material-ui/core/Avatar";
import {history} from "../../Utils/History";

const { Header, Content, Footer, Sider } = Layout;
const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        code: 'SE123',
        name: '互联网产品应用与开发',
        teacher: "王肇国",
        address: '东上院411',
        time: ['周一3-4节', '周二3-4节'],
        status: 0,
        sem: ['2019-2020', 'Spring']
    },
    {
        key: '2',
        code: 'SE124',
        name: '软件工程原理与实践',
        teacher: "王肇国",
        address: '东上院412',
        time: ['周一6-8节'],
        status: 1,
        sem: ['2020-2021', 'Fall']
    },
    {
        key: '3',
        code: 'SE125',
        name: '计算机图形学',
        teacher: "王肇国",
        address: '上院411',
        time: ['周四6-8节', '周五11-13节'],
        status: 2,
        sem: ['2019-2020', 'Fall']
    },
];


export default class StuCourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses:[]
        }
    }

    componentDidMount() {
        this.getAllCourses();
    }

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

    getAllCourses = () => {

    };

    getColor = (x) => {
        if(x === 0)
            return 'green';
        if(x === 1)
            return 'blue';
        return 'red'
    };

    getClassStatus = (x) => {
        if(x === 0)
            return '尚未开课';
        if(x === 1)
            return '正在进行';
        return '课程结束';
    };

    toCourseDetail = (key) => {
        history.replace('/stuCourseDetail', {courseKey: key});
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
                        <PageHeader
                            className="site-page-header"
                            title="课程列表"
                            subTitle=""
                        />
                        <br />
                        <Table dataSource={data}>
                            <Column title="课程代码" dataIndex="code" key="code" />
                            <Column title="课程名称" dataIndex="name" key="name" />
                            <Column title="授课教师" dataIndex="teacher" key="teacher" />
                            <Column
                                title="状态"
                                dataIndex="status"
                                key="status"
                                render={status => (
                                    <Tag color = {this.getColor(status)} key={status}>
                                        {this.getClassStatus(status)}
                                    </Tag>

                                )}
                            />
                            <Column
                                title=""
                                key="action"
                                render={(text, record) => (
                                    // <Space size="middle">
                                    //     <a>查看课程详情</a>
                                    // </Space>
                                    <Popconfirm title="查看课程详情？" onConfirm={() => this.toCourseDetail(record.key)}>
                                        <a>more</a>
                                    </Popconfirm>
                                )}
                            />
                        </Table>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
