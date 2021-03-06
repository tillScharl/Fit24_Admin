import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'
import { DateTimePickerModule } from 'ng-pick-datetime';
import { BackandService } from '@backand/angular2-sdk';
import { AppRoutingModule }  from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CrudComponent } from './crud/crud.component';
import { FilesComponent } from './files/files.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { StudioService } from './studio.service';
import { ProfileComponent } from './profile/profile.component';
import { StudioOverviewComponent } from './studio-overview/studio-overview.component';
import { StudioCoursesComponent } from './studio-courses/studio-courses.component';
import { NewCourseComponent } from './new-course/new-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseDetailsComponent } from './course-details/course-details.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    CrudComponent,
    FilesComponent,
    HomeComponent,
    ProfileComponent,
    StudioOverviewComponent,
    StudioCoursesComponent,
    NewCourseComponent,
    EditCourseComponent,
    CourseDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DateTimePickerModule,
    CustomFormsModule
  ],
  providers: [BackandService, AuthService, StudioService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
