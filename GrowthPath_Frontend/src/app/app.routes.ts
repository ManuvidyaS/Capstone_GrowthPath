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

import { UserProfileComponent } from './user/userprofile/userprofile.component';
import { GetAssignedCourseComponent } from './user/get-assigned-course/get-assigned-course.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { UserFeedbackComponent } from './admin/user-feedback/user-feedback.component';

import { RecommendCourseComponent } from './user/recommend-course/recommend-course.component';
import { RecommendedCourseComponent } from './admin/recommended-course/recommended-course.component';

//import { RecommendedCoursesComponent } from './admin/recommended-courses/recommended-courses.component';

export const routes: Routes = [
  // Home and Auth Routes
  { path: 'home-page', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  
  {path: 'app-dashboard',component:DashboardComponent},

  { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  
     { path: 'app-add-course', component: AddCourseComponent },
     { path: 'app-dashboard/app-assign-course', component: AssignCourseComponent },
     { path: 'app-get-course', component: GetCourseComponent },
     { path: 'app-profile', component: ProfileComponent},
     
     {path: 'app-put-course', component: PutCourseComponent },
     {path: 'app-deletecourse', component: DeletecourseComponent},
     {path: 'app-layout', component: LayoutComponent},
     { path: 'feedback', component: FeedbackComponent },
     {path:'app-recommended-course', component: RecommendedCourseComponent},

     {path:'app-recommend-course', component: RecommendCourseComponent},
     {path:'app-layout/app-userprofile', component: UserProfileComponent},
     {path:'get-assigned-course', component:GetAssignedCourseComponent },
     { path: 'update-course', component: UpdatecourseComponent },
     {path:'app-user-feedback', component:UserFeedbackComponent}

     
   
];
