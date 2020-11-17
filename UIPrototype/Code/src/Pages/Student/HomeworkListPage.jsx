import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, PageHeader, Table} from 'antd';
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
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
        courseNum: 'CS111',
        courseName: '计算器入门',
        name: '第一次测验',
        openStatus: '已发布',
        submitStatus: '已提交',
        score: '92'
    },
    {
        key: '2',
        courseNum: 'SE222',
        courseName: 'how to calculate 1+1',
        name: 'quiz2',
        openStatus: '已发布',
        submitStatus: '已提交',
        score: '100'
    },
    {
        key: '3',
        courseNum: 'SE222',
        courseName: 'how to calculate 1+1',
        name: 'Nightmare',
        openStatus: '已发布',
        submitStatus: '已提交',
        score: '15'
    },
    {
        key: '4',
        courseNum: 'ME789',
        courseName: '工程实践',
        name: '理论实践',
        openStatus: '未发布',
        submitStatus: '未提交',
        score: 'null'
    },
];

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

export default class StuHomeworkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            homework: []
        };
    }

    componentDidMount() {
        this.getHomework();
    }

    getHomework = () => {
        let type = this.state.type;
        // get homework by type
    };

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
                        title="作业列表"
                        subTitle=""
                    />
                    <br />
                    <Table dataSource={data}>
                        <Column title="课程编号" dataIndex="courseNum" key="courseNum" />
                        <Column title="课程名称" dataIndex="courseName" key="courseName" />
                        <Column title="作业名称" dataIndex="name" key="name" />
                        <Column title="发布状态" dataIndex="openStatus" key="openStatus" />
                        <Column title="课程编号" dataIndex="courseNum" key="courseNum" />
                        <Column
                            title="详情"
                            render={(text, record) => (
                                <div>
                                  <a href={'javascript:void(0)'}
                                     onClick={()=>{
                                         let id = record.key;
                                         history.push('/stuHomeworkDetail', {id: id});
                                     }}
                                  >
                                   查看
                                  </a>
                                </div>)
                            }
                        />
                        <Column title="提交状态" dataIndex="submitStatus" key="submitStatus" />
                        <Column title="作业成绩" dataIndex="score" key="score" />
                    </Table>
                </Content>
                <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
