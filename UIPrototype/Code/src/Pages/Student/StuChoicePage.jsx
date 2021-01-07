import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, PageHeader, Table, Tag, Button, Popconfirm, Radio, Input, Modal, message, Typography, Divider} from 'antd';
import {
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { Column, ColumnGroup } = Table;
const { Title, Paragraph, Text, Link } = Typography;

let base = global.data.baseUrl;

const columns = [
    {
        title: '详情',
        render: (text, record) =>
            <div>
                <a href={'javascript:void(0)'} onClick={()=>{
                    console.log(record.name + "clicked!")
                }}>
                    查看
                </a>
            </div>
    },
    {
        title: '作业成绩',
        dataIndex: 'score',
        key: 'score'
    }
];

export default class StuChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 全部选择题
            // 需要学生id与课程id
            choices: [],
            // 具体某个选择题
            currChoice: '',
            studentId: this.props.location.state.ssid,
            courseId: this.props.location.state.ccid,
            homework: [],
            showHelp:false,
            value :1,
            showCurr: false,
            showAns: "",
        };
    }

    onChangeChoice = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    commitChoiceAns = () => {
        let v = this.state.value;
        let answer = 'd';
        if(v === 1) answer = 'a';
        if(v === 2) answer = 'b';
        if(v === 3) answer = 'c';
        let studentId = this.state.studentId;
        let choiceId = this.state.currChoice.id;
        let url = base + "/stu/submitans";
        let data = {
            studentid: studentId,
            choiceid: choiceId,
            ans: answer
        };
        let _this = this;
        axios.post(url, data).then(
            resp => {
                if(resp && resp.status === 200) {
                    let checkCode = resp.data.code;
                    console.log(checkCode);
                    if(checkCode === 300) {
                        message.warning("已提交，请勿重复提交！");
                    }
                    if(checkCode === 200) {
                        message.success("恭喜你答对了！");
                    }
                    if(checkCode === 201) {
                        message.error("答案错误！");
                    }
                }
            }
        );
    };

    getChoices = () => {
        let _this = this;
        console.log("attention");
        let sid = this.state.studentId;
        let cid = this.state.courseId;
        let url = base + "/stu/allchoice/" + sid + "/" + cid;
        axios.get(url).then(
            resp => {
                if(resp && resp.status === 200) {
                    let data = resp.data;
                    console.log(data);
                    _this.setState({
                        choices: data
                    });
                }
            }
        )
    };

    componentDidMount() {
        this.getChoices();
    }

    toStuInfo = () => {
        history.replace('/stuUserInfo');
    };

    toStuCourseList = () => {
        history.replace('/stuCourseList');
    };

    toStuHomeworkList = () => {
        history.replace('/stuHomeworkList', {type: 3});
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

    getColor = (x) => {
        if(x === "e") {
            return 'red';
        }
        return "blue"
    };

    getClassStatus = (x) => {
        if(x === "e") {
            return "未完成";
        }
        return "已完成";
    };

    getFormalAns = (x) => {
        let myAnswer = x.answer;
        let formalAns = x.formalAns;
        console.log("fuck");
        console.log(formalAns);
        console.log(x);
        if(myAnswer === "e") {
            return "none";
        } else {
            return formalAns;
        }
    };

    getChoiceDetail = (x) => {
       let _this = this;
       let url = base + "/stu/choiceitem/" + x;
       axios.get(url).then(
           resp => {
               if(resp && resp.status === 200) {
                   console.log(resp);
                   this.setState({
                       currChoice: resp.data
                   })
               }
           }
       );
       this.setState({
           showCurr: true
       });
    };

    handleOk = () => {
        this.commitChoiceAns();
        this.setState({
            showCurr: false
        });
    };

    handleCancel = () => {
        this.setState({
            showCurr: false
        });
    };

    render(){
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return(
            <Layout>

                <Modal title="Basic Modal" visible={this.state.showCurr} maskClosable={false}
                       onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Paragraph>{this.state.currChoice.content}</Paragraph>
                    <Radio.Group onChange={this.onChangeChoice} value={this.state.value}>
                        <Radio style={radioStyle} value={1}>
                            {this.state.currChoice.choicea}
                        </Radio>
                        <Radio style={radioStyle} value={2}>
                            {this.state.currChoice.choiceb}
                        </Radio>
                        <Radio style={radioStyle} value={3}>
                            {this.state.currChoice.choicec}
                        </Radio>
                        <Radio style={radioStyle} value={4}>
                            {this.state.currChoice.choiced}
                        </Radio>
                    </Radio.Group>
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

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} onClick = {this.stuMenuRedirect}>
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
                            title="选择题列表"
                            subTitle=""
                        />
                        <br />
                        <Table dataSource={this.state.choices}>
                            <Column title="题目" dataIndex="content" key="content"/>
                            <Column
                                title="状态"
                                dataIndex="answer"
                                key="answer"
                                render={ answer => (
                                    <Tag color={this.getColor(answer)} key={answer}>
                                        {this.getClassStatus(answer)}
                                    </Tag>

                                )}
                            />
                            <Column
                                title="答案"
                                render={(text, record) => (
                                    <div>
                                        <Text>
                                            {this.getFormalAns(record)}
                                        </Text>
                                    </div>)
                                }
                            />
                            <Column
                                title="查看题目"
                                render={(text, record) => (
                                    <div>
                                        <a href={'javascript:void(0)'}
                                           onClick={()=> {
                                               let choceId = record.choiceid;
                                               // 获取选择题信息
                                               this.getChoiceDetail(choceId);
                                           }}
                                        >
                                            查看
                                        </a>
                                    </div>)
                                }
                            />
                        </Table>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
