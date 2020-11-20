import React from 'react'
import {Layout, Menu, Table, Tag, Space, PageHeader, Popconfirm} from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        code: 'SE123',
        name: '互联网产品应用与开发',
        num_stu: 61,
        address: '东上院411',
        time: ['周一3-4节', '周二3-4节'],
        status: {sta: '正在进行', color: 'green'},
        sem: ['2019-2020', 'Spring']
    },
    {
        key: '2',
        code: 'SE124',
        name: '软件工程原理与实践',
        num_stu: 59,
        address: '东上院412',
        time: ['周一6-8节'],
        status: {sta: '未开始', color: 'blue'},
        sem: ['2020-2021', 'Fall']
    },
    {
        key: '3',
        code: 'SE125',
        name: '计算机图形学',
        num_stu: 72,
        address: '上院411',
        time: ['周四6-8节', '周五11-13节'],
        status: {sta: '已结束', color: 'red'},
        sem: ['2019-2020', 'Fall']
    },
];


export default class TeaCourseList extends React.Component{

    
    constructor(props) {
        super(props);
        this.state = {
            course:{},
        };
    }

    toCourseDetail = (key) => {
        history.replace('/teaCourseDetail', {courseKey: key});
    };

    toTeaInfo = () =>{
        history.replace('/teaUserInfo')
    }

    toTeaCourseList = () =>{
        history.replace('/teaCourseList')
    }

    toTeaSubmitCourse = () =>{
        history.replace('/teaSubmitCourse')
    }

    toTeaHomeworkList = ()=>{
        history.replace('/teaHomeworkList')
    }

    toTeaHomeworkRelease = ()=>{
        history.replace('/teaHomeworkRelease')
    }

    getTeaCourseDetail = () =>{
        let type = this.state.type;
    }

    teaMenuRedirect = (event) =>{
        let key = event.key;
        if(key === '1'){
            this.toTeaInfo();
        }
        if(key === '2'){
            this.toTeaSubmitCourse();
        }
        if(key === '3'){
            this.toTeaCourseList();
        }
        if(key === '4'){
            this.toTeaHomeworkRelease();
        }
        if(key === '5'){
            this.toTeaHomeworkList();
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} onClick = {this.teaMenuRedirect}>
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
                        <PageHeader
                            className="site-page-header"
                            title="课程列表"
                            subTitle=""
                        />
                        <br />

                        <Table dataSource={data}>
                            <Column title="课程代码" dataIndex="courseId" key="courseId" />
                            <Column title="课程名称" dataIndex="course_name" key="course_name" />
                            {/* <Column title="学生数量" dataIndex="num_stu" key="num_stu" /> */}
                            {/* <Column title="教室" dataIndex="address" key="address" /> */}
                            {/* <Column
                                title="学期"
                                dataIndex="sem"
                                key="sem"
                                render={sem => (
                                    <>
                                        {sem.map(tag => (
                                            <Tag color="orange" key={tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </>
                                )}
                            />
                            <Column
                                title="时间"
                                dataIndex="time"
                                key="time"
                                render={time => (
                                    <>
                                        {time.map(tag => (
                                            <Tag color="blue" key={tag}>
                                                {tag}
                                            </Tag>
                                        ))}
                                    </>
                                )}
                            />
                            <Column
                                title="状态"
                                dataIndex="status"
                                key="status"
                                render={status => (
                                    <Tag color={status.color} key={status}>
                                        {status.sta}
                                    </Tag>

                                )}
                            /> */}
                            <Column
                                title=""
                                key="action"
                                render={(text, record) => (
                                    // 根据数据类型进行修改
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
