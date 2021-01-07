import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import {history} from "./Utils/History";
import Login from "./Pages/Share/login";
import Register from "./Pages/Share/register";

import StuCourseDetail from "./Pages/Student/CourseDetailPage";
import StuCourseList from "./Pages/Student/CourseListPage";
import StuHomeworkCommit from "./Pages/Student/HomeworkCommitPage";
import StuHomeworkDetail from "./Pages/Student/HomeworkDetailPage";
import StuUserInfo from "./Pages/Student/UserInfoPage";
import StuHomeworkList from "./Pages/Student/HomeworkListPage";

import TeaAddStudent2Course from "./Pages/Teacher/AddStudent2CoursePage";
import TeaCheckHomework from "./Pages/Teacher/CheckHomeworkPage";
import TeaCourseDetail from "./Pages/Teacher/CourseDetailPage";
import TeaCourseList from "./Pages/Teacher/CourseListPage";
import TeaHomeworkList from "./Pages/Teacher/HomeworkListPage";
import TeaHomeworkRelease from "./Pages/Teacher/HomeworkReleasePage";
import TeaSubmitCourse from "./Pages/Teacher/SubmitCoursePage";
import TeaUserInfo from "./Pages/Teacher/UserInfoPage";

import StuChoice from "./Pages/Student/StuChoicePage";

import TeaHomeworkChoice from "./Pages/Teacher/HomeworkChoicePage";

class BasicRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                {/* basic router */}
                <Route exact path = "/" component={Login} />
                <Route exact path = "/login" component = {Login} />
                <Route exact path = "/register" component={Register} />
                {/* student router */}
                <Route exact path = "/stuUserInfo" component={StuUserInfo} />
                <Route exact path = "/stuCourseList" component={StuCourseList} />
                <Route exact path = "/stuCourseDetail" component={StuCourseDetail} />
                <Route exact path = "/stuHomeworkCommit" component={StuHomeworkCommit} />
                <Route exact path = "/stuHomeworkDetail" component={StuHomeworkDetail} />
                <Route exact path = "/stuHomeworkList" component={StuHomeworkList} />
                {/* teacher router */}
                <Route exact path = "/teaAddStudent2Course" component={TeaAddStudent2Course} />
                <Route exact path = "/teaCheckHomework" component={TeaCheckHomework} />
                <Route exact path = "/teaCourseDetail" component={TeaCourseDetail} />
                <Route exact path = "/teaCourseList" component={TeaCourseList} />
                <Route exact path = "/teaHomeworkList" component={TeaHomeworkList} />
                <Route exact path = "/teaHomeworkRelease" component={TeaHomeworkRelease} />
                <Route exact path = "/teaSubmitCourse" component={TeaSubmitCourse} />
                <Route exact path = "/teaUserInfo" component={TeaUserInfo} />
                {/* choice */}
                <Route exact path = "/stuChoice" component={StuChoice} />
                <Route exact path = "/teaHomeworkChoice" component={TeaHomeworkChoice} />
            </Router>
        );
    }
}

export default BasicRouter;
