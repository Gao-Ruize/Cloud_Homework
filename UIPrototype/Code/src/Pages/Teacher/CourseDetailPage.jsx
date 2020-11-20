import React from 'react'
import {Button, Descriptions, Layout, Menu, Timeline, Space, PageHeader, Row, Col} from 'antd';
import {Image, Typography} from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from "axios";

let base = global.data.baseUrl;
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

export default class TeaCourseDetail extends React.Component{
    // state = {
    //     current: 'mail',
    //     courseInfo:{
    //         imgUrl:'https://i.loli.net/2020/10/08/LHWT2zrwkU3lQPK.png',
    //         name:'校纪校规学习',
    //         courseID:'se000',
    //         time:'2020 fall',
    //         describe:'加深学生对学校校纪校规学习的理解,避免违法乱纪的现象发生',
    //         plan:'每周一到周五8:00-10:00上课，共18周，无考试',
    //         books:'校纪校规手册'
    //     }
    // };

    constructor(props) {
        super(props);
        this.state = {
            // 从路由获取参数 课程id
            courseKey: this.props.location.state.courseKey,
            id:'',
            name:'',
            courseId:'',
            teacherId:'',
            status:'',
            teacherName:'',
            imgUrl:'https://i.loli.net/2020/10/08/LHWT2zrwkU3lQPK.png',
        };
    }

    getCourseData = () => {
        let Url = base + 'api/student/getCourseDetail/' + this.state.courseKey;
        let _this = this;
        axios.get(Url)
            .then(resp => {
                if(resp && resp.status === 200) {
                    let courseDetail = resp.data;
                    _this.setState({
                        id: courseDetail.id,
                        name: courseDetail.name,
                        courseId: courseDetail.courseId,
                        teacherId: courseDetail.teacherId,
                        status:courseDetail.status,
                        teacherName:courseDetail.teacherName
                    });
                }
            })
    };

    componentDidMount() {
        this.getCourseData();
    }

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

    toTeaCheckHomework = () =>{
        history.push('/teaCheckHomework')
    }

    toTeaAddStudent2Course = ()=>{
        history.push('/teaAddStudent2Course')
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
                                <Col span={12}>
                                    <Image
                                        width={400}
                                        height={200}
                                        src={this.state.imgUrl}
                                    />
                                </Col>
                                <Col span={12}>
                                    <div>
                                        <Title>{this.state.name}</Title>
                                        <Title level={2}>{this.state.courseId}</Title>
                                        {/* <Title level={3}>{this.state.time}</Title> */}
                                    </div>
                                </Col>
                            </Row>

                            <Row style = {{paddingTop: 30}} align="top">
                                <Col span={24}>
                                    <div className='CTBar' style={{float: 'left'}}>
                                        <Space>
                                            <Button type="primary" size="large" onClick={this.toTeaHomeworkRelease}>发布作业</Button>
                                            <Button type="primary" size="large" onClick={this.toTeaCheckHomework}>批改作业</Button>
                                            <Button type="primary" size="large" onClick={this.toTeaAddStudent2Course}>添加学生</Button>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>

                            <Row style = {{paddingTop: 30}} >
                                <Col span={24}>
                                    <Descriptions title="课程详情" bordered column={5}>
                                        <Descriptions.Item label="课程名称" span={3}>
                                            {this.state.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="课号" span={2}>
                                            {this.state.courseId}
                                        </Descriptions.Item>
                                        {/* <Descriptions.Item label="课程简介" span={3}>
                                            {this.state.courseInfo.describe}
                                        </Descriptions.Item> */}
                                        {/* <Descriptions.Item label="课程时间" span={2}>
                                            {this.state.courseInfo.time}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="教学计划" span={2}>
                                            {this.state.courseInfo.plan}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="教材" span={3}>
                                            {this.state.courseInfo.books}
                                        </Descriptions.Item> */}
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
