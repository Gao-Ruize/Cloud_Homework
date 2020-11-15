import React, {Component} from 'react'
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";
import {history} from "../../Utils/History";
import { message } from 'antd';


const currencies = [
  {
    value: 'EE',
    label: '电子信息与电气工程学院',
  },
  {
    value: 'M',
    label: '机械与动力工程学院',
  },
  {
    value: 'A',
    label: '安泰经济与管理学院',
  },
  {
    value: 'Y',
    label: '药学院',
  },
  {
    value: 'K',
    label: '凯原法学院',
  },
  {
    value: 'MathR',
    label: '数学科学学院',
  },
  {
    value: 'R',
    label: '人文学院',
  },
];

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      mail: '',
      class: '',
      department: '',
      phone: '',
      qq: '',
    }
  }

  showSuccessMsg = () => {
    message.info("注册成功！");
  };

  showFailMsg = () => {
    message.info("注册失败！");
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

  storeQq = (event) => {
    this.setState({qq: event.target.value});
  };


  register = () => {
    if(true) {
      this.showSuccessMsg();
      history.replace('/login');
    }
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
              <TextField required variant="outlined" label="学号" style={{width: "100%"}}
                         onChange={this.storeId}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="姓名" style={{width: "100%"}}
                         onChange={this.storeName}/>
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
              <TextField required select variant="outlined" label="学院" style={{width: "100%"}}
                         onChange={this.storeDepartment}>
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" label="电话" style={{width: "100%"}}
                         onChange={this.storePhone}/>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" label="QQ" style={{width: "100%"}}
                         onChange={this.storeQq}/>
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
