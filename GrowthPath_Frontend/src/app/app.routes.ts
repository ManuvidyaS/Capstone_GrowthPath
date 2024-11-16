import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

 // Main admin component with navbar
import { GetCourseComponent } from './admin/get-course/get-course.component';
import { GetCourseByIdComponent } from './admin/get-course-by-id/get-course-by-id.component';
import { PutCourseComponent } from './admin/put-course/put-course.component';
import { DeletecourseComponent } from './admin/deletecourse/deletecourse.component';
import { AddCourseComponent } from './admin/add-course/add-course.component'; // Add new course component
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FeedbackComponent } from './user/feedback/feedback.component';
import { LayoutComponent } from './user/layout/layout.component';
import { AssignCourseComponent } from './admin/assign-course/assign-course.component';
import { UpdatecourseComponent } from './user/update-course/update-course.component';
//import { RecommendedCoursesComponent } from './admin/recommended-courses/recommended-courses.component';

export const routes: Routes = [
  // Home and Auth Routes
  { path: 'home-page', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  
  {path: 'app-dashboard',component:DashboardComponent,},

  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  //{ path: '', redirectTo: 'home-page', pathMatch: 'full' },

  
  
    //children: [
     { path: 'app-add-course', component: AddCourseComponent },
     { path: 'app-dashboard/app-assign-course', component: AssignCourseComponent },
     { path: 'app-dashboard/app-get-course', component: GetCourseComponent },
     {path: 'app-layout', component: LayoutComponent},
     { path: 'app-layout/app-feedback', component: FeedbackComponent },
     { path: 'app-layout/app-update-course', component: UpdatecourseComponent },

     
    //   { path: 'get-course-by-id', component: GetCourseByIdComponent },
    //   { path: 'put-course', component: PutCourseComponent },
    //   { path: 'deletecourse', component: DeletecourseComponent },
    //  // { path: 'recommended-courses', component: RecommendedCoursesComponent },
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default view for admin
    // ]
    //}
];
