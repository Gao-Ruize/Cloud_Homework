import React from 'react'
import { Layout, Menu, Select, Button, PageHeader, Table, Space,message, Modal } from 'antd';
import {
    TableOutlined, HighlightOutlined,
    FormOutlined, ReadOutlined, UserOutlined
} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;const { Column, ColumnGroup } = Table;
let base = global.data.baseUrl;
// const data = [
//     {
//         key: '1',
//         homework_name: '五月20日作业',
//         release_time: '2020/5/20 8:00',
//         deadline: '2020/5/21 23:30',
//         course: '语文',
//         tot_num: 50,
//         finish_num: 50,
//     },
//     {
//         key: '2',
//         homework_name: '五月20日作业',
//         release_time: '2020/5/20 8:00',
//         deadline: '2020/5/21 23:00',
//         course: '数学',
//         tot_num: 46,
//         finish_num: 46,
//     },
//     {
//         key: '3',
//         homework_name: '五月21日作业',
//         release_time: '2020/5/21 9:00',
//         deadline: '2020/5/22 23:30',
//         course: '语文',
//         tot_num: 50,
//         finish_num: 48,
//     },
//     {
//         key: '4',
//         homework_name: '五月21日作业',
//         release_time: '2020/5/21 8:00',
//         deadline: '2020/5/21 23:00',
//         course: '数学',
//         tot_num: 46,
//         finish_num: 45,
//     },
//     {
//         key: '5',
//         homework_name: '第一次作文',
//         release_time: '2020/5/20 12:00',
//         deadline: '2020/5/27 12:00',
//         course: '语文',
//         tot_num: 50,
//         finish_num: 12,
//     },
//     {
//         key: '6',
//         homework_name: '五月22日作业',
//         release_time: '2020/5/22 9:00',
//         deadline: '2020/5/22 23:30',
//         course: '英语',
//         tot_num: 45,
//         finish_num: 45,
//     },
// ];

const dataSource = [
    {
      key: '1',
      name: 'mbgson',
      studentId: 32,
    },
    {
      key: '2',
      name: 'sfa',
      studentId: 42,
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Button size="middle" onClick={this.toCorrectHomework}>
          批改
        </Button>
      )
    },
  ];
  


export default class TeaHomeworkList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            homework: []
        };
    } ;

    showModal = () => {
        this.setState({
          visible: true,
        });

        // let UserId = localStorage.getItem('UserId');
        // let Url = base + 'teacher/getstuhomeworklist';
        // let _this = this;
        // let data = {
        //     name: this.state.homework.id
        // }
        // axios.get(Url)
        //     .then(resp => {
        //         if(resp && resp.status === 200) {
        //             let CourseList = resp.data;
        //             console.log("aaaa",resp.data)
        //             _this.setState({
        //                 courses: CourseList
        //             });
        //         }
        //     })
        
      };

      handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      toCorrectPage = ()=>{
          history.push('/teaCheckHomework')
      }
    columns = [
        {
            title: '课程编号',
            dataIndex: 'courseId',
            key: 'courseId',
            render: text => <a>{text}</a>,
        },
        // {
        //     title: '课程名称',
        //     dataIndex: 'courseName',
        //     key: 'courseName',
        //     render: text => <a>{text}</a>,
        // },
        {
            title: '作业名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '截止日期',
            dataIndex: 'deadline',
            key: 'deadline',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: '完成情况',
            key: 'check',
            render: (text, record) => (
                <Space>
                    <Button type="primary" size="small" onClick={this.showModal}>
                            选择学生批改
                    </Button>
                        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
                                      <Table dataSource={dataSource}>
                            <Column title="姓名" dataIndex="name" key="name" />
                            <Column title="学号" dataIndex="studentId" key="studentId" />
                            <Column
                                title=""
                                key="action"
                                render={(text, record) => (
                                    // 根据数据类型进行修改
                                    <Button title="批改" onClick={this.toCorrectPage}>
                                        批改
                                    </Button>
                                )}
                            />
                        </Table>
        </Modal>
                </Space>
    
            ),
        },
    ];


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

    toTeaCheckHomework = () =>{
        history.push('/teaCheckHomework', {cid: this.state.courseKey})
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
    componentDidMount() {
        this.getHomework();
    }
    getHomework = () => {
        let _this = this;
        let teacherId = localStorage.getItem('Uid');
        let Url = base + 'teacher/getHomeworksByTid/' + teacherId ;
        axios.get(Url)
            .then(resp => {
                if(resp && resp.status === 200) {
                    let data = resp.data;
                    _this.setState({
                        homework: data
                    });
                }
            })
    };

    // getAllCourses = () => {
    //     let UserId = localStorage.getItem('UserId');
    //     let Url = base + 'teacher/getallcoursebytid/' + UserId;
    //     let _this = this;
    //     axios.get(Url)
    //         .then(resp => {
    //             if(resp && resp.status === 200) {
    //                 let CourseList = resp.data;
    //                 console.log("aaaa",resp.data)
    //                 _this.setState({
    //                     courses: CourseList
    //                 });
    //             }
    //         })

    // };

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
                            title="作业列表"
                            subTitle="查看已布置作业"
                        />

                        <Table columns ={this.columns} dataSource={this.state.homework} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>云作业平台</Footer>
                </Layout>
            </Layout>
        )
    }
}
