import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, Upload, Input, Button, PageHeader,} from 'antd';
import {
    UploadOutlined,
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import Avatar from "@material-ui/core/Avatar";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default class stuHomeworkCommitPage extends React.Component {
    state = {
        fileList: [],
        uploading: false,
    };

    handleUpload = () => {
        const {fileList} = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        this.setState({
            uploading: true,
        });
    }

    render(){
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

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
                    <div className="logo"></div>

                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
                        <Menu.Item key="1" icon={<AuditOutlined />}>
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="2" icon={<TableOutlined />}>
                            我的课程
                        </Menu.Item>
                        <Menu.Item key="3" icon={<HighlightOutlined />}>
                            我的作业
                        </Menu.Item>
                        {/*<Menu.Item key="4" icon={<ToTopOutlined />}>*/}
                        {/*    上传作业*/}
                        {/*</Menu.Item>*/}
                    </Menu>
                </Sider>
                <Layout className="site-layout" style={{ marginLeft: 200 }}>
                    <Header className="site-layout-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <PageHeader
                            className="site-page-header"
                            onBack={() => null}
                            title="提交作业"
                            subTitle="返回到作业详情"
                        />
                        <br />
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>选择文件</Button>
                        </Upload>

                        <TextArea rows={4} style={{marginTop: 24}} placeholder="请输入备注"/>
                        <Button
                            type="primary"
                            onClick={this.handleUpload}
                            disabled={fileList.length === 0}
                            loading={uploading}
                            style={{ marginTop: 16, width: 300 }}
                        >
                            {uploading ? '上传中' : '上传'}
                        </Button>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
