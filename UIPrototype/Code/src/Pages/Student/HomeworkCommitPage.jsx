import React from 'react';
import 'antd/dist/antd.css';

import {Button, Col, Input, Layout, Menu, message, PageHeader, Row} from 'antd';
import {AuditOutlined, HighlightOutlined, TableOutlined,} from '@ant-design/icons';
import {history} from "../../Utils/History";
import axios from 'axios';

let base = global.data.baseUrl;

const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;

const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

export default class StuHomeworkCommit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            homeworkId: this.props.location.state.hid,
            content: '',
            src: '',
            showHelp:false
        }
    }

  toStuInfo = () => {
    history.replace('/stuUserInfo');
  };

  toStuCourseList = () => {
    history.replace('/stuCourseList');
  };

  toStuHomeworkList = () => {
    history.replace('/stuHomeworkList', {type: 3});
  };

  showSuccessMsg = () => {
    message.success("提交成功！");
  };

  showDelayMsg = () => {
    message.error("已超时，提交失败！");
  };

  showOtherErrMsg = () => {
    message.error("提交失败，请重试！");
  };


    showRepeatMsg = () => {
        message.info("重复提交，已覆盖先前提交！");
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

  // handleUpload = () => {
  //     const {fileList} = this.state;
  //     const formData = new FormData();
  //     fileList.forEach(file => {
  //         formData.append('files[]', file);
  //     });
  //     console.log(this.state.fileList);
  //
  //     this.setState({
  //         uploading: true,
  //     });
  // };

  handleUpload = () => {
    const {fileList} = this.state;
    const formData = new FormData();
    formData.append('file1', fileList[0]);   //注意第一个参数是传给后台的参数名字，我的项目中叫file1
    // formData.append('file2', fileList[1]);   //注意第一个参数是传给后台的参数名字，我的项目中叫file2

    this.setState({
      uploading: true,
    });

    console.log(this.state.fileList);
    console.log(formData);
  };


    handleCommit = () => {
        let Url = base + 'student/handInHomework';
        let _this = this;
        let studentId = localStorage.getItem('Uid');
        let hId = this.state.homeworkId;
        let content = this.state.content;
        let picture = this.state.src;
        let data = {
            sid: studentId,
            hid: hId,
            content: content,
            picture: picture
        };
        axios.post(Url, data)
            .then(resp => {
                if(resp && resp.status === 200) {
                    let code = resp.data.code;
                    if(code === 200) {
                        _this.showSuccessMsg();
                    } else if(code === 201) {
                        _this.showDelayMsg();
                    } else if(code === 202) {
                        _this.showRepeatMsg();
                    } else {
                        _this.showOtherErrMsg();
                    }
                }
            })
    axios.post(Url, data)
      .then(resp => {
        if (resp && resp.status === 200) {
          let code = resp.data.code;
          if (code === 200) {
            _this.showSuccessMsg();
          } else if (code === 201) {
            _this.showDelayMsg();
          } else {
            _this.showOtherErrMsg();
          }
        }
      })
  };

  storeContent = event => {
    this.setState({
      content: event.target.value
    });
  };

  convertImgToBase64 = (url, callback, outputFormat) => {
    let canvas = document.createElement('CANVAS'),
      ctx = canvas.getContext('2d'),
      img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL(outputFormat || 'image/png');
      callback.call(this, dataURL);
      canvas = null;
    };
    img.src = url;
  };

  storePhoto = (e) => {
    let _this = this;
    let files = e.target.files;
    let check = files.length;
    if (check <= 0)
      return;
    const path = URL.createObjectURL(e.target.files[0]);
    this.convertImgToBase64(path, function (base64Img) {
      console.log(base64Img);
      _this.setState({
        src: base64Img,
      });
    });
  };

  handleDelete = () => {
    this.setState({
      src: ''
    });
  };

  render() {
    let _this = this;
    const {uploading, fileList} = this.state;
    // const props = {
    //     fileList,
    //     beforeUpload: file => {
    //         if (file.type !== 'image/png') {
    //             message.error(`${file.name} is not a png file`);
    //         }
    //         return file.type === 'image/png';
    //     },
    //     onChange: info => {
    //         console.log(info.fileList);
    //         // file.status is empty when beforeUpload return false
    //         _this.setState(
    //             {fileList: info.fileList.filter(file => !!file.status)}
    //         )
    //     },
    // };
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

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
              onBack={this.backToHomeDetail}
              title="提交作业"
              subTitle="返回到作业详情"
            />
            <br/>
            {/*<Form>*/}
            {/*    <Form.Item*/}
            {/*        name="upload"*/}
            {/*        label="Upload"*/}
            {/*        valuePropName="fileList"*/}
            {/*        getValueFromEvent={normFile}*/}
            {/*        extra="请上传图片"*/}
            {/*    >*/}
            {/*        <Upload name="logo" listType="picture">*/}
            {/*            <Button>*/}
            {/*                <UploadOutlined /> Click to upload*/}
            {/*            </Button>*/}
            {/*        </Upload>*/}
            {/*    </Form.Item>*/}
            {/*</Form>*/}
            {/*<div>*/}
            {/*    <Upload {...props}>*/}
            {/*        <Button>*/}
            {/*            Select File*/}
            {/*        </Button>*/}
            {/*    </Upload>*/}
            {/*    <Button*/}
            {/*        type="primary"*/}
            {/*        onClick={this.handleUpload}*/}
            {/*        disabled={fileList.length === 0}*/}
            {/*        loading={uploading}*/}
            {/*        style={{ marginTop: 16 }}*/}
            {/*    >*/}
            {/*        {uploading ? 'Uploading' : 'Start Upload' }*/}
            {/*    </Button>*/}
            {/*</div>*/}

            <Input
              type={'file'}
              accept={"image/*"}
              onChange={this.storePhoto}
              size={"large"}
              bordered={true}
              addonBefore={"选择图片"}
              style={{width: '500px'}}
              allowClear
            />

            <TextArea rows={4} style={{marginTop: 24}} placeholder="请输入备注" onChange={this.storeContent}/>
            <Row>
              <Col span={8}>
              </Col>
              <Col span={8}>
                <Button
                  type='danger'
                  onClick={this.handleCommit}
                  style={{marginTop: 16, width: 300}}
                >
                  提交作业
                </Button>
              </Col>
              <Col span={8}>
              </Col>
            </Row>
          </Content>
          <Footer style={{textAlign: 'center'}}>云作业平台</Footer>
        </Layout>
      </Layout>
    )
  }
};
