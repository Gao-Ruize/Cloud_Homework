
import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, Button, Timeline, Descriptions, Space, PageHeader,  Modal} from 'antd';
import {
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';


const { Header, Content, Footer, Sider } = Layout;

const data = {
    id: 1,
    courseId: 'SE125',
    name: "计算机视觉",
    teacherId: '1234',
    teacherName: "王肇国",
    status: 0,
};

let base = global.data.baseUrl;

export default class StuCourseDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 从路由获取参数 课程id
            courseId: this.props.location.state.courseKey,
            courseData: [],
            studentId: localStorage.getItem('Uid'),
            studentId2: localStorage.getItem('userId'),
            showModal: false,
            grade: 0,
            showHelp:false
        };
    }

    getCourseState = (x) => {
        if(x === 0)
            return '尚未开课';
        if(x === 1)
            return '正在进行';
        return '已结课';
    };

    componentDidMount() {
        this.getCourseData();
    }

    closeModal = () => {
        this.setState({showModal: false});
    };

    showHelp = () => {
        this.setState({showHelp: true});
    };

    closeHelp = () => {
        this.setState({showHelp: false});
    };

    getCourseData = () => {
        let Url = base + 'student/getCourseDetail/' + this.state.courseId;
        let _this = this;
        axios.get(Url)
            .then(resp => {
                if(resp && resp.status === 200) {
                    let courseDetail = resp.data;
                    _this.setState({
                        courseData: courseDetail
                    });
                }
            })

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

    toStuChoice = () => {
        console.log("check!!!!");
        let sid = this.state.studentId;
        let cid = this.state.courseId;
        history.push('/stuChoice', {ssid: sid, ccid: cid});
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

    // 根据 courseId 与 studentID 获取作业，成绩等内容
    // 通过 type 确定获取哪种作业(all finished unfinished)
    getAllHomework = () => {
        history.push('/stuHomeworkList', {type: 0, courseId: this.state.courseId});
    };

    getUnfinishedHomework = () => {
        history.push('/stuHomeworkList', {type: 1, courseId: this.state.courseId});
    };

    getFinishedHomework = () => {
        history.push('/stuHomeworkList', {type: 2, courseId: this.state.courseId});
    };


    getGrade = () => {
        // get grade
        let _this = this;
        let UserId = this.state.studentId;
        let CourseId = this.state.courseData.id;
        let Url = base + 'student/getGrade/' + UserId + '/' + CourseId;
        axios.get(Url)
            .then(resp => {
                if(resp && resp.status === 200) {
                    let score = resp.data;
                    _this.setState({
                        grade: score
                    });
                }
            });
        this.setState({showModal: true});
    };

    render(){
        return(
            <Layout>

                <Modal
                    title="成绩统计"
                    visible={this.state.showModal}
                    onOk={this.closeModal}
                    onCancel={this.closeModal}
                >
                    <p>你的当前成绩为：</p>
                    <p>{this.state.grade}</p>
                </Modal>

                <Modal
                    title="帮助"
                    visible={this.state.showHelp}
                    onOk={this.closeHelp}
                    onCancel={this.closeHelp}
                >
                    <p>如需帮助请拨打：54749110</p>
                </Modal>

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
                                <Descriptions.Item label="课程代码">{this.state.courseData.courseId}</Descriptions.Item>
                                <Descriptions.Item label="课程名称">{this.state.courseData.name}</Descriptions.Item>
                                <Descriptions.Item label="授课教师">{this.state.courseData.teacherName}</Descriptions.Item>
                                <Descriptions.Item label="教师工号">{this.state.courseData.teacherId}</Descriptions.Item>
                                <Descriptions.Item label="课程简介">{this.state.courseData.courseInfo}</Descriptions.Item>
                                <Descriptions.Item label="状态">{this.getCourseState(this.state.courseData.status)}</Descriptions.Item>
                            </Descriptions>

                            <Space>
                                <Button type="primary" size='large' onClick={this.getAllHomework}>
                                    查看全部作业
                                </Button>
                                <Button type="primary" size='large' onClick={this.getUnfinishedHomework}>
                                    查看未完成作业
                                </Button>
                                <Button type="primary" size='large' onClick={this.getFinishedHomework}>
                                    查看已完成作业
                                </Button>
                                <Button type="primary" size='large' onClick={this.getGrade}>
                                    查看成绩
                                </Button>
                                <Button type="primary" size='large' onClick={this.toStuChoice}>
                                    查看选择题
                                </Button>
                            </Space>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        <Button onClick = {this.showHelp}>帮助</Button>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}
