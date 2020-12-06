import React from 'react';
import 'antd/dist/antd.css';

import {Layout, Menu, PageHeader, Table} from 'antd';
import {AuditOutlined, HighlightOutlined, TableOutlined,} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

const {Header, Content, Footer, Sider} = Layout;
const {Column, ColumnGroup} = Table;

let base = global.data.baseUrl;


const data = [
  {
    key: '1',
    courseNum: 'CS111',
    courseName: '计算器入门',
    name: '第一次测验',
    openStatus: '已发布',
    submitStatus: '已提交',
    score: '92'
  },
  {
    key: '2',
    courseNum: 'SE222',
    courseName: 'how to calculate 1+1',
    name: 'quiz2',
    openStatus: '已发布',
    submitStatus: '已提交',
    score: '100'
  },
  {
    key: '3',
    courseNum: 'SE222',
    courseName: 'how to calculate 1+1',
    name: 'Nightmare',
    openStatus: '已发布',
    submitStatus: '已提交',
    score: '15'
  },
  {
    key: '4',
    courseNum: 'ME789',
    courseName: '工程实践',
    name: '理论实践',
    openStatus: '未发布',
    submitStatus: '未提交',
    score: 'null'
  },
];

const columns = [
  {
    title: '详情',
    render: (text, record) =>
      <div>
        <a href={'javascript:void(0)'} onClick={() => {
          console.log(record.name + "clicked!")
        }}>
          查看
        </a>
      </div>
  },
  {
    title: '作业成绩',
    dataIndex: 'score',
    key: 'score'
  }
];

export default class StuHomeworkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.location.state.type,
      homework: []
    };
  }

  componentDidMount() {
    this.getHomework();
  }

  getHomework = () => {
    let _this = this;
    let type = this.state.type;
    let courseId = 0;
    if (type !== 3)
      courseId = this.props.location.state.courseId;
    let studentId = localStorage.getItem('Uid');
    let Url = base + 'student/getHomeworks/' + studentId + '/' + courseId + '/' + type;
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

  toStuInfo = () => {
    history.replace('/stuUserInfo');
  };

  toStuCourseList = () => {
    history.replace('/stuCourseList');
  };

  toStuHomeworkList = () => {
    history.replace('/stuHomeworkList', {type: 3});
  };

  stuMenuRedirect = (event) => {
    let key = event.key;
    if (key === '1') {
      this.toStuInfo();
    }
    if (key === '2') {
      this.toStuCourseList();
    }
    if (key === '3') {
      this.toStuHomeworkList();
    }
  };

  render() {
    return (
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

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']} onClick={this.stuMenuRedirect}>
            <Menu.Item key="1" icon={<AuditOutlined/>}>
              个人信息
            </Menu.Item>
            <Menu.Item key="2" icon={<TableOutlined/>}>
              我的课程
            </Menu.Item>
            <Menu.Item key="3" icon={<HighlightOutlined/>}>
              我的作业
            </Menu.Item>
          </Menu>

        </Sider>
        <Layout className="site-layout" style={{marginLeft: 200}}>
          <Header className="site-layout-background" style={{padding: 0}}/>
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <PageHeader
              className="site-page-header"
              title="作业列表"
              subTitle=""
            />
            <br/>
            <Table dataSource={this.state.homework}>
              <Column title="课程编号" dataIndex="courseId" key="courseId"/>
              <Column title="课程名称" dataIndex="courseName" key="courseName"/>
              <Column title="作业名称" dataIndex="name" key="name"/>
              <Column
                title="详情"
                render={(text, record) => (
                  <div>
                    <a href={'javascript:void(0)'}
                       onClick={() => {
                         let id = record.id;
                         history.push('/stuHomeworkDetail', {homeworkId: id});
                       }}
                    >
                      查看
                    </a>
                  </div>)
                }
              />
              {/*<Column title="提交状态" dataIndex="submitStatus" key="submitStatus" />*/}
              {/*<Column title="作业成绩" dataIndex="score" key="score" />*/}
            </Table>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
