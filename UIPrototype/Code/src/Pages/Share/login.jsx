import React, {Component} from 'react'
import {Button, Card, CardContent, CardHeader, Grid, TextField, Typography} from "@material-ui/core";

export default class Login extends Component {
  render() {

    return (
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
              />
            </Grid>

            <Grid item xs={6}>
              <Button style={{width: "100%"}} variant="contained" color="secondary" size="large">登录</Button>
            </Grid>
            <Grid item xs={6}>
              <Button style={{width: "100%"}} variant="contained" color="primary" size="large">注册</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}