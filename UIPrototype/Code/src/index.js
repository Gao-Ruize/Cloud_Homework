import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Pages/Share/login';
import Register from './Pages/Share/register';
import StuUserInfoPage from './Pages/Student/UserInfoPage';
import StuHomeworkListPage from './Pages/Student/HomeworkListPage';
import StuHomeworkDetailPage from './Pages/Student/HomeworkDetailPage';
import StuHomeworkCommitPage from './Pages/Student/HomeworkCommitPage';
import StuCourseListPage from './Pages/Student/CourseListPage';
import StuCourseDetailPage from './Pages/Student/CourseDetailPage';
import TeaUserInfoPage from './Pages/Teacher/UserInfoPage';
import TeaSubmitCoursePage from './Pages/Teacher/SubmitCoursePage';
import TeaCourseListPage from './Pages/Teacher/CourseListPage';
import TeaCourseDetailPage from './Pages/Teacher/CourseDetailPage';
import TeaAddStudent2CoursePage from './Pages/Teacher/AddStudent2CoursePage';
import TeaHomeworkListPage from './Pages/Teacher/HomeworkListPage';
import TeaCheckHomeworkPage from './Pages/Teacher/CheckHomeworkPage';
import TeaHomeworkReleasePage from './Pages/Teacher/HomeworkReleasePage';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
     {/*<Login />*/}
     {/*<Register />*/}
    {/*<StuUserInfoPage />*/}
    {/* <StuHomeworkListPage />*/}
    {/*<StuHomeworkDetailPage />*/}
    {/*<StuHomeworkCommitPage />*/}
    {/*<StuCourseListPage />*/}
    {/*<StuCourseDetailPage />*/}
    {/*<TeaUserInfoPage />*/}
    {/*<TeaSubmitCoursePage />*/}
    {/*<TeaCourseListPage />*/}
    <TeaCourseDetailPage />
    {/*<TeaAddStudent2CoursePage />*/}
    {/*<TeaHomeworkListPage />*/}
    {/*<TeaHomeworkReleasePage />*/}
    {/*<TeaCheckHomeworkPage />*/}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
