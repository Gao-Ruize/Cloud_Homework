import React, {Component} from 'react'
import {Button, Card, CardContent, CardHeader, Grid, MenuItem, TextField, Typography} from "@material-ui/core";


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
  render() {

    return (
      <Card style={{width: "30%", margin: "30px auto"}}> <CardHeader
        title={<Typography variant={"h5"} align={"center"}>
          注册
        </Typography>}
      />
        <CardContent>
          <Grid container spacing={3}>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="学号" style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="姓名" style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="邮箱" style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required variant="outlined" label="班级" style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={12}>
              <TextField required select variant="outlined" label="学院" style={{width: "100%"}}>
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" label="电话" style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" label="QQ" style={{width: "100%"}}/>
            </Grid>


            <Button style={{width: "70%", margin: "auto"}} variant="contained" color="secondary"
                    size="large">注册</Button>


          </Grid>
        </CardContent>
      </Card>
    );
  }
}