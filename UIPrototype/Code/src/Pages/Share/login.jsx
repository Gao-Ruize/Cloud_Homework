import React, {Component} from 'react'
import {Button, Card, CardContent, CardHeader, Grid, TextField, Typography} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {history} from "../../Utils/History";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      open: false
    };
  };


  storeName = event => {
    let name = event.target.value;
    this.setState({name: name});
  };

  storePassword = event => {
    let pw = event.target.value;
    this.setState({password: pw});
  };

  openErrDialog = () => {
    this.setState({open: true});
  };

  closeErrDialog = () => {
    this.setState({open: false});
  };

  login = () => {
    let name = this.state.name;
    let password = this.state.password;
    if(name === "student") {
      history.replace('/stuCourseList');
      localStorage.setItem("UserType", "student");
      localStorage.setItem("ID", "123");
    } else
    if(name === "teacher") {
      history.replace('/teaCourseList');
      localStorage.setItem("UserType", "teacher");
      localStorage.setItem("ID", "234");
    }
    this.openErrDialog();
  };

  redirectToRegister = () => {
    this.setState({open: false});
    history.replace('/register');
  };

  render() {
    return (
        <div>
        <Dialog
            open={this.state.open}
            onClose={this.closeErrDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"登录失败"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              用户不存在或用户名或密码输入错误，登录失败！
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeErrDialog} color="primary">
              重试
            </Button>
            <Button onClick={this.redirectToRegister} color="primary" autoFocus>
              注册
            </Button>
          </DialogActions>
        </Dialog>

      <Card style={{width: "30%", margin: "200px auto"}}> <CardHeader
        title={<Typography variant={"h5"} align={"center"}>
          云作业平台
        </Typography>}
        subheader={<Typography variant={"body1"} align={"center"}>
          登陆后使用更多功能
        </Typography>}
      />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                label="用户名"
                type="用户名"
                autoComplete="current-password"
                variant="outlined"
                style={{width: "100%"}}
                onChange={this.storeName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-password-input"
                label="密码"
                type="密码"
                autoComplete="current-password"
                variant="outlined"
                style={{width: "100%"}}
                onChange={this.storePassword}
              />
            </Grid>

            <Grid item xs={6}>
              <Button style={{width: "100%"}} variant="contained" color="secondary" size="large"
                      onClick={this.login}>登录</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{width: "100%"}} variant="contained" color="primary" size="large"
                      onClick={this.redirectToRegister}>注册</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
        </div>
    );
  }
}
