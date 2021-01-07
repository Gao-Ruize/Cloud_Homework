import React from 'react'
import {Layout, Menu, message, PageHeader, Select, Table} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select;
let base = global.data.baseUrl;
const {Column} = Table;
const data = [
  {
    key: '1',
    name: '张三',
    ID: 1234500,
    class: 1,
    grade: '二年级',
  }];
export default class TeaAddStudent2Course extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      user: [],
      cid: this.props.location.state.cid,
      sid: '',
      students: []
    };

    let {sortedInfo, filteredInfo} = this.state;
    this.sortedInfo = sortedInfo || {};
    this.filteredInfo = filteredInfo || {};
  }

  componentDidMount() {
    this.getStudentList();
  };

  getStudentList = () => {
    let Url = base + 'teacher/getallstudents';
    let _this = this;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200) {
          let data = resp.data;
          console.log(resp.data)
          _this.setState({
            students: data
          });
        }
      })
  };

  handleChange = (filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    console.log("filteredInfo: ", filters)
  };

  clearFilters = () => {
    this.setState({filteredInfo: null});
  };
  toTeaInfo = () => {
    history.replace('/teaUserInfo')
  }

  toTeaCourseList = () => {
    history.replace('/teaCourseList')
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
    if (key === '5') {
      this.toTeaHomeworkList();
    }
  };


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
              onBack={() => null}
              title="添加学生到课程"
              subTitle="返回到课程详情"
            />
            <br/>

            <Table
              dataSource={this.state.students}
            >
              <Column title="学生姓名" dataIndex="username" key="username"/>
              <Column title="学生学号" dataIndex="userId" key="userId"/>
              <Column
                title="添加至课程"
                render={(text, record) => (
                  <div>
                    <a
                      onClick={() => {
                        console.log('here!');
                        let sid = record.userId;
                        let cid = this.state.cid;
                        let Url = base + 'teacher/addAStudent/' + cid + '/' + sid;
                        data: {
                        }
                        ;
                        axios.post(Url, data)
                          .then(resp => {
                            console.log(resp);
                            if (resp && resp.status === 200) {
                              if (resp.data.code === 200) {
                                message.success("添加成功");
                              } else {
                                message.error("请勿重复添加")
                              }
                            }
                          });
                      }}
                    >
                      添加至课程
                    </a>
                  </div>)
                }
              />
            </Table>
            &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
