import React from 'react'
import { Layout, Menu, PageHeader, Button, Radio, Row, Col, Input, Descriptions, List, Card, InputNumber, Select, Image,Slider } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined,
    UploadOutlined
} from '@ant-design/icons';
import {history} from "../../Utils/History";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;


const data = [
    // {
    //     type: 1,
    //     index: 1,
    //     text: '下列各组成语中，没有错别字的一组是(　　 )\n\tA.国泰民安　　风衣足食　　内忧外患　　政通人和\n\tB.臭名远扬　　兵慌马乱　　哀鸿遍野　　如泣如诉\n\tC.风景名盛　　不苟言笑　　太平盛世　　足智多谋\n\tD.夜不闭户　　民不聊生　　生灵涂炭　　多事之秋',
    //     answer: 'B',
    //     score: 0,
    //     value: 10,
    // },
    // {
    //     type: 1,
    //     index: 2,
    //     text: '下列问句中，内容表示肯定的一句是(　　 )\n\tA.人们说它是在望哨，可它真是在望哨吗？\n\tB.但是白鹭本身不就是一首很优美的歌吗?\n\tC.谁能把花生的好处说出来？\n\tD.妈，怎么还不摇桂花呢?',
    //     answer: 'C',
    //     score: 0,
    //     value: 10,
    // },
    {
        type: 2,
        index: 3,
        text: '用上恰当的关联词，把下面的两个句子连成一句话。\n\n\t他离开家乡已经很久了。他对这个地方仍然很熟悉。',
        answer: '他离开家乡已经很久了。他对这个地方仍然很熟悉',
        score: 0,
        value: 20,
    },
    {
        type: 2,
        index: 4,
        text: '(白鹭)色素的配合，身段的大小，一切都很适宜。白鹤太大而嫌生硬，即使如粉红的朱鹭或灰色的苍鹭，也觉得大了一些，而且太不寻常了。(《白鹭》)\n\n这个句子运用___________的修辞手法，突出了白鹭的_____________________。',
        answer: '',
        score: 0,
        value: 20,
    }
];


export default class TeaCheckHomework extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            commitedTime:'',
            homeworkId:'',
            grade:'',
            content:'',
            student_id:'',
            picture:'',
        };
    }

    handleMark = e => {
        console.log(e.target.value);
    };
    onInputScore = value => {
        console.log('changed', value);
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
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']} onClick = {this.teaMenuRedirect}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            个人信息
                        </Menu.Item>
                        <Menu.Item key="2" icon={<FormOutlined />}>
                            开课申请
                        </Menu.Item>
                        <Menu.Item key="3" icon={<TableOutlined />}>
                            课程
                        </Menu.Item>
                        {/* <Menu.Item key="4" icon={<HighlightOutlined />}>
                            发布作业
                        </Menu.Item> */}
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
                            onBack={this.toTeaHomeworkList}
                            title="批改作业"
                            subTitle="返回到作业情况"
                        />
                        <br />

                        <List
                            size="large"
                            style={{paddingLeft: 24}}
                            header={<div>
                                <Descriptions title="">
                                    {/* <Descriptions.Item label="作业名">{this.state.homeworkName}</Descriptions.Item>
                            <Descriptions.Item label="课程">{this.state.courseName}</Descriptions.Item> */}
                                    <br />
                                    {/* <Descriptions.Item label="学生">张三</Descriptions.Item> */}
                            <Descriptions.Item label="学号">{this.state.student_id}</Descriptions.Item>
                                    <Descriptions.Item label="评分">
                                        {this.state.grade?this.state.grade:0}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>}
                            footer={<div><Button type="primary">确认提交</Button></div>}

                            dataSource={data}
                            renderItem={item =>
                                // <List.Item>
                                //     <Card size="large" title={'第'+item.index+'题'} extra={item.score+'/'+item.value+'分'} style={{ width: '100%' }}>
                                //         <p style={{whiteSpace:"pre"}}>{item.text}</p>
                                //         <p>
                                //             {"学生答案："}
                                //             {item.answer==''?<font color='red'>{'未作答！'}</font>:<font color='blue'>{item.answer}</font>}
                                //         </p>
                                //         {(()=> {
                                //             switch(item.type){
                                //                 case 1:
                                //                     return <Radio.Group buttonStyle='solid' onChange={this.handleMark}>
                                //                         <Radio.Button value="right"><font color='blue'>正确</font></Radio.Button>
                                //                         <Radio.Button value="fault"><font color='red'>错误</font></Radio.Button>
                                //                     </Radio.Group>;
                                //                 case 2:
                                //                     return  <Row>
                                //                         <Col span={4}>
                                //                             <InputNumber
                                //                                 min={0}
                                //                                 max={item.value}
                                //                                 style={{ margin: '0 16px' }}
                                //                                 defaultValue={item.score}
                                //                                 onChange={this.onInputScore}
                                //                             />
                                //                         </Col>
                                //                         {/* <Col span={12}>
                                //                             <Slider
                                //                                 min={0}
                                //                                 max={item.value}
                                //                                 onChange={this.onInputScore}
                                //                                 defaultvalue={item.score}
                                //                             />
                                //                         </Col> */}
                                //                     </Row>;
                                //                 case 3:
                                //                     return <p><font color='red'>题目类型错误！</font></p>;
                                //             }
                                //         })()}
                                //     </Card>
                                // </List.Item>}
                                <Card size = "large"style={{ width: '100%' }}>
                                    <Image
                                        width={400}
                                        height={200}
                                        src={this.state.picture}
                                    />
                                <InputNumber
                                    min={0}
                                    max={item.value}
                                    style={{ margin: '0 16px' }}
                                    defaultValue={item.score}
                                    onChange={this.onInputScore}
                                />
                                </Card>
                            }
                        />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
