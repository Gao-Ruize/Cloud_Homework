import React from 'react'
import { Layout, Menu, PageHeader, Form, Button, Upload, Input } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {history} from "../../Utils/History";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};


export default class TeaSubmitCourse extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            courseID:'',
            time:'',
            imgUrl:'',
            describe:'',
            plan:'',
            books:''
        }
    }
    submit = () => {
    };
    changeName = event => {
        let x = event.target.value;
        this.setState({name: x});
    };
    changeCourseID = event => {
        let x = event.target.value;
        this.setState({courseID: x});
    };

    changeCourseInfo = event => {
        let x = event.target.value;
        this.setState({courseInfo: x});
    };

    changeTeacherID = event => {
        let x = event.target.value;
        this.setState({teacherID: x});
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']} onClick = {this.teaMenuRedirect}>
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
                            title="课程提交申请表"
                            subTitle="请按要求填写下表"
                        />
                        <Form style={{marginTop:30}}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: '请输入课程名!' }]}
                            >
                                <Input value={this.state.name} onChange={this.changeName}/>
                            </Form.Item>

                            <Form.Item
                                label="CourseID"
                                name="CourseID"
                                rules={[{ required: true, message: '请输入课程编号!' }]}
                            >
                                <Input value={this.state.courseID} onChange={this.changeCourseID}/>
                            </Form.Item>

                            <Form.Item
                                label="CourseInfo"
                                name="CourseInfo"
                                rules={[{ required: true, message: '请输入课程信息！' }]}
                            >
                                <Input value={this.state.courseInfo} onChange={this.changeCourseInfo}/>
                            </Form.Item>

                            <Form.Item
                                label="TeacherId"
                                name="TeacherId"
                                rules={[{ required: true, message: '请输入教师编号！' }]}
                            >
                                <Input value={this.state.courseInfo} onChange={this.changeTeacherID}/>
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" onClick = {this.submit}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
