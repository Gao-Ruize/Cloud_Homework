import React from 'react';
import 'antd/dist/antd.css';

import {Button, Descriptions, Layout, Menu, PageHeader} from 'antd';
import {AuditOutlined, HighlightOutlined, TableOutlined,} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

let base = global.data.baseUrl;

const {Header, Content, Footer, Sider} = Layout;

const homeworks = {
  name: '第一次测验',
  releaseTime: '2020-10-09 21:32:00',
  deadline: '2020-10-10 22:00:00',
  content: 'Consider a linear regression on data set D={(x1, t1), (x2, t2),…,(xN, tN)} in which each data point is associated with a weighting factor rn > 0, so that the sum-of-squares error function becomes: \n' +
    'LaTeX: L\\left(W\\mid D\\right)=\\frac{1}{2}\\sum^N_{n=1}r_n\\left\\{t_n-W^T\\varphi\\left(x_n\\right)\\right\\}^2L ( W ∣ D ) = 1 2 ∑ n = 1 N r n { t n − W T φ ( x n ) } 2\n' +
    '\n' +
    '    where φ(xn) is the basic function that transforms data into a computation-friendly shape and W is the\n' +
    '\n' +
    '    model parameter to be estimated. Find an expression for the solution W∗ that minimizes this error\n' +
    '\n' +
    '    function. (Hint: consider the matrix form of the objective function)',
  demands: '请提交一张图片',
};

export default class StuHomeworkDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            id: this.props.location.state.homeworkId,
            showHelp:false
        };
    }

    componentDidMount() {
        this.getHomework();
    }

    getHomework = () => {
        // get homework by id
        let Url = base + 'student/getHomeworkDetail/' + this.state.id;
        let _this = this;
        axios.get(Url)
            .then(resp => {
                if(resp && resp.status === 200) {
                    _this.setState({
                        info: resp.data
                    });
                }
            })
    };

  componentDidMount() {
    this.getHomework();
  }

  getHomework = () => {
    // get homework by id
    let Url = base + 'student/getHomeworkDetail/' + this.state.id;
    let _this = this;
    axios.get(Url)
      .then(resp => {
        if (resp && resp.status === 200) {
          _this.setState({
            info: resp.data
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

  toHomeworkDetail = () => {
    let homeworkId = this.state.id;
    history.push('/stuHomeworkCommit', {hid: homeworkId});
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
              onBack={() => null}
              title="作业详情"
              subTitle="返回到作业列表"
            />
            <br/>
            <Descriptions title="作业详情" layout="vertical">
              <Descriptions.Item label="作业名称">{this.state.info.name}</Descriptions.Item>
              <Descriptions.Item label="发布时间">{this.state.info.releaseTime}</Descriptions.Item>
              <Descriptions.Item label="截止时间">{this.state.info.deadline}</Descriptions.Item>
              <Descriptions.Item label="提交要求">{this.state.info.demands}</Descriptions.Item>
              <Descriptions.Item label="详情" span={4}><p style={{whiteSpace: "pre"}}>{this.state.info.content}</p>
              </Descriptions.Item>
              <Descriptions.Item>{
                <Button type={"primary"}
                        size={"large"}
                        onClick={this.toHomeworkDetail()}
                >
                  提交作业
                </Button>
              }
              </Descriptions.Item>
            </Descriptions>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
}
