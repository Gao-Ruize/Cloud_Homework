import React from 'react'
import {Button, Card, Descriptions, InputNumber, Layout, List, Menu, message, PageHeader, Select} from 'antd';
import {FormOutlined, ReadOutlined, TableOutlined, UserOutlined} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from "axios";

let base = global.data.baseUrl;
const {Header, Content, Footer, Sider} = Layout;
const {Option} = Select;

const data = [
  {
    type: '',
    index: '',
    text: '',
    answer: '',
    score: '',
    value: '',
  },

];
export default class TeaCheckHomework extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      commitedTime: '',
      homeworkId: '',
      grade: '',
      content: '',
      student_id: '',
      picture: '',
      homework_id: this.props.location.state.homework_id//该学生作业id
    };
  }

  handleMark = e => {
    console.log(e.target.value);
  };
  onInputScore = value => {
    console.log('changed', value);
    this.state.grade = value
    console.log('grade:', this.state.grade)
  }

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
    this.getHomeworkData();
  }

  getHomeworkData = () => {
    let Url = base + 'teacher/getstuhomework/' + this.state.homework_id;
    let _this = this;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200) {
          let homework = resp.data;
          console.log(resp.data);
          _this.setState({
            grade: homework.grade,
            picture: homework.picture,
            student_id: homework.studentId,
            content: homework.content
          })

        }
      })
  };

  ratestuhomework = () => {
    let Url = base + 'teacher/ratestuhomework';
    let data = {
      id: this.state.homework_id,
      grade: this.state.grade
    }
    console.log("data:", data)
    axios.post(Url, data)
      .then(resp => {
        if (resp && resp.status === 200) {
          if (resp.data.code === 200) {
            message.success('批改成功');
          } else
            message.error('批改失败');
        }
      })
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
              onBack={this.toTeaHomeworkList}
              title="批改作业"
              subTitle="返回到作业情况"
            />
            <br/>

            <List
              size="large"
              style={{paddingLeft: 24}}
              header={<div>
                <Descriptions title="">
                  <Descriptions.Item label="学号">{this.state.student_id}</Descriptions.Item>
                  <Descriptions.Item label="评分">
                    {this.state.grade ? this.state.grade : 0}
                  </Descriptions.Item>
                </Descriptions>
              </div>}
              dataSource={data}
              renderItem={item =>
                <Card size="large" style={{width: '100%'}}>
                  <div><InputNumber
                    min={0}
                    max={100}
                    style={{margin: '0 16px'}}
                    defaultValue={0}
                    onChange={this.onInputScore}
                    style={{marginTop:"10px"}}
                  /><Button type="primary" onClick={this.ratestuhomework}>确认提交</Button></div>
                  
                  <img style={{textAlign: "center", width:"30%", height:"auto"}} src={this.state.picture}/>
                  <div style={{marginTop:"50px"}}>文字: </div>
                  <div style={{marginTop:"20px",marginLeft:"30px"}}>{this.state.content}</div>
                </Card>
              }
            />
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
