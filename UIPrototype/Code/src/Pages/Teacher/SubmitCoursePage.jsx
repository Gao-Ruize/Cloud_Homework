import React from 'react'
import { Layout, Menu, PageHeader, Form, Button, Upload, Input } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined,
    UploadOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};


export default class teaSubmitCoursePage extends React.Component{
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
    changeTime = event => {
        let x = event.target.value;
        this.setState({time: x});
    };
    changeDis = event => {
        let x = event.target.value;
        this.setState({describe: x});
    };
    changeBook = event => {
        let x = event.target.value;
        this.setState({books: x});
    };
    changePlan = event => {
        let x = event.target.value;
        this.setState({plan: x});
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
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
                                label="Time"
                                name="Time"
                                rules={[{ required: true, message: '请输入上课时间' }]}
                            >
                                <Input value={this.state.time} onChange={this.changeTime}/>
                            </Form.Item>

                            <Form.Item
                                label="Describe"
                                name="Describe"
                                rules={[{ required: true, message: '请输入课程描述!' }]}
                            >
                                <TextArea rows={2} value={this.state.describe} onChange={this.changeDis}/>
                            </Form.Item>

                            <Form.Item
                                label="Books"
                                name="Books"
                                rules={[{ required: true, message: '请输入所需书籍!' }]}
                            >
                                <TextArea rows={2} value={this.state.books} onChange={this.changeBook}/>
                            </Form.Item>

                            <Form.Item
                                label="Plan"
                                name="Plan"
                                rules={[{ required: true, message: '请输入课程计划!' }]}
                            >
                                <TextArea rows={2} value={this.state.plan} onChange={this.changeBook}/>
                            </Form.Item>

                            <Form.Item
                                name="upload image"
                                label="UploadImage"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                extra=" "
                            >
                                <Upload name="logo" action="/upload.do" listType="picture">
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
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