import React from 'react'
import { Layout, Menu, Select, Button, Checkbox, PageHeader, Table } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;


const data = [
    {
        key: '1',
        name: '张三',
        ID: 1234500,
        class: 1,
        grade: '二年级',
    },
    {
        key: '2',
        name: '李四',
        ID: 1234501,
        class: 3,
        grade: '四年级',
    },
    {
        key: '3',
        name: '王八',
        ID: 1234502,
        class: 3,
        grade: '四年级',
    },
    {
        key: '4',
        name: '学生四',
        ID: 1234503,
        class: 5,
        grade: '五年级',
    },
    {
        key: '5',
        name: '学生五',
        ID: 1234506,
        class: 2,
        grade: '五年级',
    },
    {
        key: '6',
        name: 'J学生六',
        ID: 1234507,
        class: 2,
        grade: '一年级',
    },
    {
        key: '7',
        name: '学生七',
        ID: 1234508,
        class: 4,
        grade: '二年级',
    },
    {
        key: '8',
        name: '学生八',
        ID: 1234510,
        class: 4,
        grade: '三年级',
    },
    {
        key: '9',
        name: '学生九',
        ID: 1234511,
        class: 5,
        grade: '三年级',
    },
    {
        key: '10',
        name: '学生十',
        ID: 1234512,
        class: 1,
        grade: '一年级',
    },
    {
        key: '11',
        name: '森下下士',
        ID: 1234513,
        class: 2,
        grade: '四年级',
    },
    {
        key: '12',
        name: '学生十二',
        ID: 1234515,
        class: 4,
        grade: '六年级',
    },
    {
        key: '13',
        name: '学生十三',
        ID: 1234516,
        class: 3,
        grade: '六年级',
    },
    {
        key: '14',
        name: '学生十四',
        ID: 1234517,
        class: 5,
        grade: '五年级',
    },
    {
        key: '15',
        name: '学生十五',
        ID: 1234519,
        class: 2,
        grade: '二年级',
    },

];

export default class teaAddStudent2CoursePage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            filteredInfo: null,
            sortedInfo: null,
        };

        let { sortedInfo, filteredInfo } = this.state;
        this.sortedInfo = sortedInfo || {};
        this.filteredInfo = filteredInfo || {};
        //_this = this;
    }

    handleChange = (filters, sorter) => {
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };


    render(){
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '学号',
                dataIndex: 'ID',
            },
            {
                title: '班级',
                dataIndex: 'class',
                filters: [
                    { text: '一年级', value: '一年级' },
                    { text: '二年级', value: '二年级' },
                    { text: '三年级', value: '三年级' },
                    { text: '四年级', value: '四年级' },
                    { text: '五年级', value: '五年级' },
                    { text: '六年级', value: '六年级' },
                ],
                filteredValue: this.filteredInfo.address || null,
                onFilter: (value, record) => record.class.includes(value),
            },
            {
                title: '年级',
                dataIndex: 'grade',
                filters: [
                    { text: '一年级', value: '一年级' },
                    { text: '二年级', value: '二年级' },
                    { text: '三年级', value: '三年级' },
                    { text: '四年级', value: '四年级' },
                    { text: '五年级', value: '五年级' },
                    { text: '六年级', value: '六年级' },
                ],
                filteredValue: this.filteredInfo.address || null,
                onFilter: (value, record) => record.grade.includes(value),
            }
        ];
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
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
                            onBack={() => null}
                            title="添加学生到课程"
                            subTitle="返回到课程详情"
                        />
                        <br />

                        <Table
                            rowSelection={Checkbox}
                            columns={columns}
                            dataSource={data}
                            onChange={this.handleChange}
                        />
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <Button type="primary">
                            Submit
                        </Button>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}