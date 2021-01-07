import React from 'react'
import {Button, Layout, Menu, Modal, PageHeader, Select, Space, Table} from 'antd';
import {CustomerServiceFilled, FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select;
const {Column, ColumnGroup} = Table;
let base = global.data.baseUrl;

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


export default class TeaHomeworkList extends React.Component {
  // TODO：
  // 1. 获取该作业学生列表
  // 2. 点击批改按钮后，跳转到该学生的作业详情页面

  constructor(props) {
    super(props);
    this.state = {
      homework: [],
      h_id:'',
      id:'1',
      courseId:'1',
    };
  } ;

  showModal = () => {
    this.setState({
      visible: true,
    });

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
  toCorrectPage = () => {
    history.push('/teaCheckHomework')
  }

  getstuhomeworklist = ()=>{
    let h_id = this.state.h_id;
    console.log("h_id", h_id)
    let Url = base + 'teacher/getstuhomeworklist/100/100/'+ h_id;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200){
          let homeworklist = resp.data;
          console.log("homeworklist: ", resp.data)
          this.setState({
            homeworklist:homeworklist
          })
          
        }
      })

  }

  columns = [
    {
      title: '课程编号',
      dataIndex: 'courseId',
      key: 'courseId',
      render: text => <a>{text}</a>,
    },
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
      render: text => <a>{text.slice(0,10)}</a>
    },
    {
      title: '完成情况',
      key: 'check',
      render: (text, record) => (
        <Space>
          {/* <Button type="primary" size="small" onClick={this.showModal}> */}
          <Button type="primary" size="small" onClick={()=> { this.setState({visible: true});this.state.h_id = text.id;this.getstuhomeworklist() }
    }>
            选择学生批改
          </Button>
          <Modal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Table dataSource={this.state.homeworklist}>
              <Column title="姓名" dataIndex="stu_name" key="stu_name"/>
              <Column title="学号" dataIndex="user_id" key="user_id"/>
              <Column
                title=""
                key="action"
                render={(text, record) => (
                  // 根据数据类型进行修改
                  <Button title="批改" onClick={()=>{history.push('/teaCheckHomework', {homework_id: text.id})}}>
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


  toTeaInfo = () => {
    history.replace('/teaUserInfo')
  }

  toTeaCourseList = () => {
    history.replace('/teaCourseList')
  }

  toTeaSubmitCourse = () => {
    history.replace('/teaSubmitCourse')
  }

  toTeaHomeworkList = () => {
    history.replace('/teaHomeworkList')
  }

  toTeaHomeworkRelease = () => {
    history.replace('/teaHomeworkRelease')
  }

  toTeaCheckHomework = () => {
    history.push('/teaCheckHomework', {cid: this.state.courseKey})
  }

  teaMenuRedirect = (event) => {
    let key = event.key;
    if (key === '1') {
      this.toTeaInfo();
    }
    if (key === '2') {
      this.toTeaSubmitCourse();
    }
    if (key === '3') {
      this.toTeaCourseList();
    }
    if (key === '4') {
      this.toTeaHomeworkRelease();
    }
    if (key === '5') {
      this.toTeaHomeworkList();
    }
  };

  componentDidMount() {
    this.getHomework();
  }

  getHomework = () => {
    let _this = this;
    let teacherId = localStorage.getItem('Uid');
    let Url = base + 'teacher/getHomeworksByTid/' + teacherId;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200) {
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

  render() {
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div className="logo"/>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']} onClick={this.teaMenuRedirect}>
            <Menu.Item key="1" icon={<UserOutlined/>}>
              个人信息
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined/>}>
              开课申请
            </Menu.Item>
            <Menu.Item key="3" icon={<TableOutlined/>}>
              课程
            </Menu.Item>
            {/* <Menu.Item key="4" icon={<HighlightOutlined />}>
                            发布作业
                        </Menu.Item> */}
            <Menu.Item key="5" icon={<ReadOutlined/>}>
              作业情况
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout" style={{marginLeft: 200}}>
          <Header className="site-layout-background" style={{padding: 0}}/>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <PageHeader
              className="site-page-header"
              title="作业列表"
              subTitle="查看已布置作业"
            />

            <Table columns={this.columns} dataSource={this.state.homework}/>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
