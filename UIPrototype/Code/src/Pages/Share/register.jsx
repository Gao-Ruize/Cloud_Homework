import React, {Component} from 'react'
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {history} from "../../Utils/History";
import { message } from 'antd';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import '../../config'

let base = global.data.baseUrl;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      mail: '',
      class: '',
      phone: '',
      password: '',
      userType: '',
      userName: '',
    }
  }

  showSuccessMsg = () => {
    message.info("注册成功！");
  };

  showFailMsg = () => {
    message.info("注册失败！用户名或邮箱重复");
  };

  storeId = (event) => {
    this.setState({id: event.target.value});
  };

  storeName = (event) => {
    this.setState({name: event.target.value})
  };

  storeMail = (event) => {
    this.setState({mail: event.target.value});
  };

  storeClass = (event) => {
    this.setState({class: event.target.value});
  };

  storeDepartment = (event) => {
    this.setState({department: event.target.value});
  };

  storePhone = (event) => {
    this.setState({phone: event.target.value});
  };

  storePassword = (event) => {
    this.setState({password: event.target.value});
  };

  storeUserType = (event) => {
    this.setState({userType: event.target.value});
    console.log(event.target.value);
  };

  storeUserName = (event) => {
    this.setState({userName: event.target.value});
  };

  toLoginPage = () => {
    history.replace('/login');
  };

  checkNull = () => {
    let c_id = this.state.id;
    let c_username = this.state.userName;
    let c_name = this.state.name;
    let c_mail = this.state.mail;
    let c_phone = this.state.phone;
    let c_password = this.state.password;
    let c_userType = this.state.userType;
    if(c_id === '' || c_username === '' || c_name === '' ||
       c_mail === '' || c_phone === '' || c_password === '' || c_userType === '')
      return 1;
    return 0;
  };

  register = () => {
    let check = this.checkNull();
    if(check === 1) {
      message.error("请填写完整信息");
      return;
    }
    let Url = base + "user/register";
    let data = {
      userid: this.state.id,
      username: this.state.userName,
      name: this.state.name,
      email: this.state.mail,
      phone: this.state.phone,
      password: this.state.password,
      usertype: this.state.userType
    };
    console.log(data);
    let _this = this;
    axios.post(Url, data)
        .then(resp => {
          if(resp && resp.status === 200) {
            let code = resp.data.code;
            if(code === 200) {
              _this.showSuccessMsg();
              _this.toLoginPage();
            } else if(code === 400) {
              message.error('邮箱格式错误');
            }
            else
            {
              _this.showFailMsg();
            }
          }
        })
  };

  render() {
    return (
        <div>

      <Card style={{width: "30%", margin: "30px auto"}}> <CardHeader
        title={<Typography variant={"h5"} align={"center"}>
          注册
        </Typography>}
      />
        <CardContent>
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="用户名" style={{width: "100%"}}
                         onChange={this.storeUserName}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="学号" style={{width: "100%"}}
                         onChange={this.storeId}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="真实姓名" style={{width: "100%"}}
                         onChange={this.storeName}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="密码" style={{width: "100%"}}
                         onChange={this.storePassword}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="邮箱" style={{width: "100%"}}
                         onChange={this.storeMail}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="班级" style={{width: "100%"}}
                         onChange={this.storeClass}/>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" label="电话" style={{width: "100%"}}
                         onChange={this.storePhone}/>
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">用户类型</FormLabel>
                <RadioGroup aria-label="type" name="type" value={this.userType} onChange={this.storeUserType}>
                  <FormControlLabel value="S" control={<Radio />} label="学生" />
                  <FormControlLabel value="T" control={<Radio />} label="教师" />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Button style={{width: "70%", margin: "auto"}} variant="contained" color="secondary"
                    size="large" onClick={this.register}>注册</Button>

          </Grid>
        </CardContent>
      </Card>
        </div>
    );
  }
}
