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
            courseKey: this.props.location.state.courseKey,
            courseData: [],
            userInfo: localStorage.getItem('UserInfo'),
            studentId: localStorage.getItem('UserInfo').userid,
            showModal: false,
            grade: 0
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

    getCourseData = () => {
        let Url = base + 'api/student/getCourseDetail/' + this.state.courseKey;
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

    // 根据 courseId 与 studentID 获取作业，成绩等内容
    // 通过 type 确定获取哪种作业(all finished unfinished)
    getAllHomework = () => {
        history.push('/stuHomeworkList', {type: 1, courseId: this.state.courseKey});
    };

    getUnfinishedHomework = () => {
        history.push('/stuHomeworkList', {type: 2, courseId: this.state.courseKey});
    };

    getFinishedHomework = () => {
        history.push('/stuHomeworkList', {type: 3, courseId: this.state.courseKey});
    };


    getGrade = () => {
        // get grade
        let _this = this;
        let UserId = this.state.studentId;
        let CourseId = this.state.courseData.courseId;
        let Url = base + 'api/student/getGrade/' + UserId + '/' + CourseId;
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
                                <Descriptions.Item label="课程代码">{data.courseId}</Descriptions.Item>
                                <Descriptions.Item label="课程名称">{data.name}</Descriptions.Item>
                                <Descriptions.Item label="授课教师">{data.teacherName}</Descriptions.Item>
                                <Descriptions.Item label="教师工号">{data.teacherId}</Descriptions.Item>
                                <Descriptions.Item label="状态">{this.getCourseState(data.status)}</Descriptions.Item>
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
                            </Space>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
