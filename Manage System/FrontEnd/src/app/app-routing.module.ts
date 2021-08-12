import { SubjectsComponent } from './subjects/subjects.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SubjectStudentComponent } from './subject-student/subject-student.component';
import { StudentComponent } from './student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', redirectTo:'homeScreen', pathMatch: 'full'  },
  { path: 'homeScreen', component: HomeScreenComponent }, 
  { path: 'subject', component: SubjectsComponent }, 
  { path: 'subjects', component: SubjectStudentComponent }, 
  { path: 'student',  component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const RoutingComponents = [
  SubjectStudentComponent
]
