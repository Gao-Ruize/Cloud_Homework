import React from 'react'
import { Layout, Menu, Col, Form, Row, Checkbox, Button, DatePicker, Input, PageHeader } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';
import {history} from "../../Utils/History";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;


export default class TeaHomeworkRelease extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            content:'',
            answer:'',
            deadline:'',
            type:[],
        }
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} onClick = {this.teaMenuRedirect}>
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
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                            <PageHeader
                                className="site-page-header"
                                title="作业发布表"
                                subTitle="请按要求填写下表"
                            />

                            <Form style={{marginTop:30}}>
                                <Form.Item
                                    label="作业名称"
                                    name="title"
                                    rules={[{ required: true, message: '请输入作业题目!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="作业内容"
                                    name="content"
                                    rules={[{ required: true, message: '请输入作业内容!' }]}
                                >
                                    <TextArea rows={3}/>
                                </Form.Item>

                                <Form.Item
                                    label="参考答案"
                                    name="answer"
                                    rules={[{ required: true, message: '请输入参考答案' }]}
                                >
                                    <TextArea rows={3}/>
                                </Form.Item>

                                <Form.Item label="选择作业时间" style={{ marginBottom: 0 }}>
                                    <Form.Item
                                        style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
                                    >
                                        <DatePicker />
                                    </Form.Item>
                                    <span
                                        style={{ display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' }}
                                    > to </span>
                                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}>
                                        <DatePicker />
                                    </Form.Item>
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

                                <Form.Item name="checkbox-group" label="Checkbox.Group">
                                    <Checkbox.Group>
                                        <Row>
                                            <Col span={8}>
                                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                                    文字形式
                                                </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="B" style={{ lineHeight: '32px' }}>
                                                    语音形式
                                                </Checkbox>
                                            </Col>
                                            <Col span={8}>
                                                <Checkbox value="C" style={{ lineHeight: '32px' }}>
                                                    图片形式
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>


                                <Form.Item >
                                    <Button type="primary">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
