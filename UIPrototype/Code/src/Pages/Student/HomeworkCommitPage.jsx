import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, Upload, Input, Button, PageHeader, message, Row, Col} from 'antd';
import {
    UploadOutlined,
    HighlightOutlined, TableOutlined, ToTopOutlined, AuditOutlined,
} from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import Avatar from "@material-ui/core/Avatar";
import {history} from "../../Utils/History";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;

export default class StuHomeworkCommit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            homeworkId: this.props.location.state.hid,
        }
    }

    componentDidMount() {
    }

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

    backToHomeDetail = () => {
        history.goBack()
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
    };

    handleCommit = () => {

    };

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
                if (file.type !== 'image/png') {
                    message.error(`${file.name} is not a png file`);
                }
                return file.type === 'image/png';
            },
            onChange: info => {
                console.log(info.fileList);
                // file.status is empty when beforeUpload return false
                this.setState({
                    fileList: info.fileList.filter(file => !!file.status)
                }
                );
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
                            onBack={this.backToHomeDetail}
                            title="提交作业"
                            subTitle="返回到作业详情"
                        />
                        <br />
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>选择文件</Button>
                        </Upload>

                        <TextArea rows={4} style={{marginTop: 24}} placeholder="请输入备注"/>
                        <Row>
                            <Col span={8}>
                                <Button
                                    type="primary"
                                    onClick={this.handleUpload}
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    style={{ marginTop: 16, width: 300 }}
                                >
                                    {uploading ? '上传中' : '上传'}
                                </Button>
                            </Col>
                            <Col span={8} />
                            <Col span={8}>
                                <Button
                                    type = 'danger'
                                    onClick = {this.handleCommit()}
                                    style={{ marginTop: 16, width: 300 }}
                                >
                                    提交作业
                                </Button>
                            </Col>
                        </Row>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
