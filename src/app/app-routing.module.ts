import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CrudComponent } from './crud/crud.component';
import { FilesComponent } from './files/files.component';
import { HomeComponent } from './home/home.component';
import { StudioCoursesComponent } from './studio-courses/studio-courses.component';
import { AuthGuard } from './auth/auth.guard';
import { NewCourseComponent } from './new-course/new-course.component';

const routes: Routes = [
	{ path: 'crud', component: CrudComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'files', component: FilesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-course', component: NewCourseComponent, canActivate: [AuthGuard] },
  { path: 'studio-courses/:studioName/:trainerId', component: StudioCoursesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
