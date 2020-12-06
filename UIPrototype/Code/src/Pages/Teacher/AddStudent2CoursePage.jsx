import React from 'react'
import {Layout, Menu, message, PageHeader, Select, Table} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select;
let base = global.data.baseUrl;
const {Column, ColumnGroup} = Table;
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
    //_this = this;
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

  // toTeaSubmitCourse = () =>{
  //     history.replace('/teaSubmitCourse')
  // }

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
    // if(key === '4'){
    //     this.toTeaHomeworkRelease();
    // }
    if (key === '5') {
      this.toTeaHomeworkList();
    }
  };


  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '学号',
        dataIndex: 'user_id',
      },
      {
        title: '昵称',
        dataIndex: 'username',
      },
      {
        title: '邮件',
        dataIndex: 'email',
      },
      {
        title: '操作',
        dataIndex: '',
        key: ''
      }
    ];
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
            {/* <Button type="primary">
                            Submit
                        </Button> */}
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
