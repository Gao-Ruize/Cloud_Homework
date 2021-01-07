import React from 'react'
import {Layout, Menu, PageHeader, Popconfirm, Table, Tag} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from "axios";

const {Header, Content, Footer, Sider} = Layout;
const {Column, ColumnGroup} = Table;
let base = global.data.baseUrl;

export default class TeaCourseList extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  getAllCourses = () => {
    let UserId = localStorage.getItem('UserId');
    let Url = base + 'teacher/getallcoursebytid/' + UserId;
    let _this = this;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200) {
          let CourseList = resp.data;
          console.log("aaaa", resp.data)
          _this.setState({
            courses: CourseList
          });
        }
      })

  };


  getColor = (x) => {
    if (x === 0)
      return 'green';
    if (x === 1)
      return 'blue';
    return 'red'
  };

  getClassStatus = (x) => {
    if (x === 0)
      return '尚未开课';
    if (x === 1)
      return '正在进行';
    return '课程结束';
  };

  toCourseDetail = (key, key2) => {
    history.replace('/teaCourseDetail', {courseKey: key, courseId: key2});
  };

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
    this.getAllCourses();
  }

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} onClick={this.teaMenuRedirect}>
            <Menu.Item key="1" icon={<UserOutlined/>}>
              个人信息
            </Menu.Item>
            <Menu.Item key="2" icon={<FormOutlined/>}>
              开课申请
            </Menu.Item>
            <Menu.Item key="3" icon={<TableOutlined/>}>
              课程
            </Menu.Item>

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
              title="课程列表"
              subTitle=""
            />
            <br/>

            <Table dataSource={this.state.courses}>
              <Column title="课程代码" dataIndex="courseId" key="courseId"/>
              <Column title="课程名称" dataIndex="name" key="name"/>
              <Column
                title="状态"
                dataIndex="status"
                key="status"
                render={status => (
                  <Tag color={this.getColor(status)} key={status}>
                    {this.getClassStatus(status)}
                  </Tag>

                )}
              />

              <Column
                title=""
                key="action"
                render={(text, record) => (
                  // 根据数据类型进行修改
                  <Popconfirm title="查看课程详情？" onClick={() => this.toCourseDetail(record.id, record.courseId)}>
                    <a>课程详情</a>
                  </Popconfirm>
                )}
              />
            </Table>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}