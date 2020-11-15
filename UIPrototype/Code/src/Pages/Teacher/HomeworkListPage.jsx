import React from 'react'
import { Layout, Menu, Select, Button, PageHeader, Table, Space } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const columns = [
    {
        title: '作业',
        dataIndex: 'homework_name',
        key: 'homework_name',
        render: text => <a>{text}</a>,
    },
    {
        title: '发布日期',
        dataIndex: 'release_time',
        key: 'release_time',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: '截止日期',
        dataIndex: 'deadline',
        key: 'deadline',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: '所属课程',
        key: 'course',
        dataIndex: 'course',
        filters: [
            {
                text: '数学',
                value: 'math',
            },
            {
                text: '语文',
                value: 'Chinese',
            },
            {
                text: '英语',
                value: 'English',
            }
        ]
    },
    {
        title: '完成情况',
        key: 'check',
        render: (text, record) => (
            <Space>
                {record.finish_num + ' / ' + record.tot_num}
                &nbsp;
                {
                    record.key<=2
                    ?
                    <Button disabled size={"small"}>
                        批改已完成
                    </Button>
                    :
                    <Button type="primary" size="small">
                        批改
                    </Button>
                }

            </Space>

        ),
    },
];

const data = [
    {
        key: '1',
        homework_name: '五月20日作业',
        release_time: '2020/5/20 8:00',
        deadline: '2020/5/21 23:30',
        course: '语文',
        tot_num: 50,
        finish_num: 50,
    },
    {
        key: '2',
        homework_name: '五月20日作业',
        release_time: '2020/5/20 8:00',
        deadline: '2020/5/21 23:00',
        course: '数学',
        tot_num: 46,
        finish_num: 46,
    },
    {
        key: '3',
        homework_name: '五月21日作业',
        release_time: '2020/5/21 9:00',
        deadline: '2020/5/22 23:30',
        course: '语文',
        tot_num: 50,
        finish_num: 48,
    },
    {
        key: '4',
        homework_name: '五月21日作业',
        release_time: '2020/5/21 8:00',
        deadline: '2020/5/21 23:00',
        course: '数学',
        tot_num: 46,
        finish_num: 45,
    },
    {
        key: '5',
        homework_name: '第一次作文',
        release_time: '2020/5/20 12:00',
        deadline: '2020/5/27 12:00',
        course: '语文',
        tot_num: 50,
        finish_num: 12,
    },
    {
        key: '6',
        homework_name: '五月22日作业',
        release_time: '2020/5/22 9:00',
        deadline: '2020/5/22 23:30',
        course: '英语',
        tot_num: 45,
        finish_num: 45,
    },
];

export default class TeaHomeworkList extends React.Component{

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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}>
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
                            title="作业列表"
                            subTitle="查看已布置作业"
                        />

                        <Table columns={columns} dataSource={data} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
